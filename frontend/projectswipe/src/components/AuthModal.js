import React, { useState } from "react";
import axios from 'axios' ;
import {useNavigate} from 'react-router-dom' ;
import {useCookies} from 'react-cookie' ;

const AuthModal = (props) => {
  const { setShowModal, isSignUp } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [err, setErr] = useState(null);
  const [cookies, setCookie , removeCookie] = useCookies(['user']) ;

  let navigate = useNavigate()

  const handleOnclick = () => {
    setShowModal(false);
  };

  const viewPWord = () =>{
    const x = document.getElementById("password") ;
    if(x.type === "password"){
      x.type = "text" ;
    }
    else{
      x.type = "password" ;
    }
  }

  const viewCWord = () =>{
    const x = document.getElementById("cpassword") ;
    if(x.type === "password"){
      x.type = "text" ;
    }
    else{
      x.type = "password" ;
    }
  }

  const handleOnSumbit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== cpassword) {
        setErr("Passwords not matching!!");
        return ;
      } 

      const response = await axios.post(`http://localhost:8000/${isSignUp?'signup':'login'}`,{email,password})
     
      setCookie('UserId', response.data.userId) ;
      setCookie('AuthToken', response.data.token) ;
      
      const success = response.status === 201
      if(success && isSignUp) navigate('/onboard')
      if(success && !isSignUp) navigate('/dashboard')

      window.location.reload() ;

      // make a post request
    } catch (error) {

      if(isSignUp && error.response.status === 409){
        setErr("User already exists. Please Login!") ;
        return ;
      }

      if(!isSignUp && error.response.status === 400){
        setErr("Invalid Credentials, Please SignUp!!") ;
        return ;
      }
      // console.log(error.response.status) ;
      console.log(error);
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleOnclick}>
        ❌
      </div>
      <h2>{isSignUp ? "Create Account" : "Log In"}</h2>
      <p>By Clicking Log In, you agree to our terms and conditions</p>
      <form onSubmit={handleOnSumbit}>
        <input
          type="email"
          id=" email"
          name="email"
          placeholder="email"
          className="emailclass"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="enter password"
            className="passwordclass"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="checkbox" onClick={viewPWord} />
        </div>
        {isSignUp && (
          <div>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              placeholder="confirm password"
              className="cpasswordclass"
              required={true}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <input type="checkbox" onClick={viewCWord} />
          </div>
        )}
        <input className="secondary-btn" type="submit" />
        <p>{err}</p>
      </form>
    </div>
  );
};

export default AuthModal;

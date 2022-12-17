import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import { useCookies } from "react-cookie";

const Home = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user']) ;
  const authToken = cookies.AuthToken;
  
  const handleOnclick = () => {
    // console.log("clicked");
    if(authToken){
      removeCookie('UserId', cookies.UserId) ;
      removeCookie('AuthToken', cookies.AuthToken) ;
      window.location.reload() ;
      return 
    }
    setShowModal(true);
    setIsSignUp(true) ;
    
  };
   
  const intro = "[Swipe Right the projects you like and then collab and make it real !!]" ;
  
  return (
    <div className="overlay">
      <Navbar
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Swipe Right</h1>
         <button className="primary-btn" onClick={handleOnclick}>
          {authToken ? "signout" : "Create Account"}
        </button>

        {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>}
      </div>
      <h1 style={{color:"#b29ab5",padding:"20px"}}>{intro}</h1>
    </div>
  );
};

export default Home;

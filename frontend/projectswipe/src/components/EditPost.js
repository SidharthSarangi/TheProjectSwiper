import React,{useState} from 'react' ;
import {useCookies} from "react-cookie" ;
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loadingspinner from './Loadingspinner';

const EditPost = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']) ;
//   const userId = cookies.UserId ;
  const [isLoading, setIsLoading] = useState(false) ;
  const {setShowEditModal} = props ;

    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        stack: "",
        stackinterest: "",
        url: "",
        tech_known: "",
        tech_use: "",
        about: "",
    })
    
    // let navigate = useNavigate() ;

    const handleSubmit = async (e) => {
        console.log('Edited') ;
        e.preventDefault() ;
        try {
            setIsLoading(true) ;
            const response = await axios.put('http://localhost:8000/edit-user', {formData})
            const response1 = await axios.put('http://localhost:8000/update-showcard',{formData})
            console.log(response)
            const success = response.status === 200
            if (success) {
                setIsLoading(false) ;
                setShowEditModal(false) ;
                window.location.reload() ;
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false) ;
        }
    }

    const handleChange = (e) => {
        // console.log('e', e)
        const value = e.target.value ;
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    
    const handleOnclick= () =>{
        setShowEditModal(false) ;
    }

  return (
    <>
    {isLoading && (<Loadingspinner/>)}
    <div className="auth-modal">
    <h2>Edit Details</h2>
    <div className="close-icon" onClick={handleOnclick}>
        ❌
      </div>
        <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="first_name"
                            maxLength={35}
                            placeholder="Ex-Bill Gates"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    

                        <label>Your Project Category:</label>
                        <div>
                            <input
                                id="web-dev"
                                type="radio"
                                name="stack"
                                value="webdev"
                                onChange={handleChange}
                                checked={formData.stack === "webdev"}
                            />
                            <label htmlFor="web-dev">Web Dev</label>
                            <input
                                id="android-dev"
                                type="radio"
                                name="stack"
                                value="android"
                                onChange={handleChange}
                                checked={formData.stack === "android"}
                            />
                            <label htmlFor="android-dev">Android</label>
                            <input
                                id="ai-ml-dev"
                                type="radio"
                                name="stack"
                                value="ai_ml"
                                onChange={handleChange}
                                checked={formData.stack === "ai_ml"}
                            />
                            <label htmlFor="ai-ml-dev">AI/ML</label>
                            <input
                                id="other-dev"
                                type="radio"
                                name="stack"
                                value="other"
                                onChange={handleChange}
                                checked={formData.stack === "other"}
                            />
                            <label htmlFor="other-dev">Other</label>
                        </div>

                        <label>Category Interested In:</label>
                        <div>
                            <input
                                id="web-dev-interest"
                                type="radio"
                                name="stackinterest"
                                value="webdev"
                                onChange={handleChange}
                                checked={formData.stackinterest === "webdev"}
                            />
                            <label htmlFor="web-dev-interest">Web Dev</label>
                            <input
                                id="android-dev-interest"
                                type="radio"
                                name="stackinterest"
                                value="android"
                                onChange={handleChange}
                                checked={formData.stackinterest === "android"}
                            />
                            <label htmlFor="android-dev-interest">Android</label>
                            <input
                                id="ai-ml-dev-interest"
                                type="radio"
                                name="stackinterest"
                                value="ai_ml"
                                onChange={handleChange}
                                checked={formData.stackinterest === "ai_ml"}
                            />
                            <label htmlFor="ai-ml-dev-interest">AI/ML</label>
                            <input
                                id="other-dev-interest"
                                type="radio"
                                name="stackinterest"
                                value="other"
                                onChange={handleChange}
                                checked={formData.stackinterest === "other"}
                            />
                            <label htmlFor="other-dev-interest">Other</label>
                        </div>

                        <label htmlFor="tech-known">Your Skills:</label>
                        <input
                            id="tech-known"
                            type="text"
                            name="tech_known"
                            placeholder="HTML, CSS, JS....."
                            value={formData.tech_known}
                            onChange={handleChange}
                        />
                        
                        <label htmlFor="tech-to-use">Tech You Want To Use</label>
                        <input
                            id="tech-to-use"
                            type="text"
                            name="tech_use"
                            placeholder="React, Angular, Vue..."
                            value={formData.tech_use}
                            onChange={handleChange}
                        />

                        <label htmlFor="about">About Project</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            placeholder="Brief"
                            minLength="100"
                            value={formData.about}
                            onChange={handleChange}
                        />
                        
                        <input type="submit"/>
                    </section>

                    <section>

                        {/* <label htmlFor="url">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            placeholder="Enter your image profile url"
                        />
                        <div>
                            {formData.url && <img src={formData.url} alt="Profile Pic"
                                                  onError={event => {
                                                  event.target.src = "https://cdn-icons-png.flaticon.com/512/2609/2609282.png"
                                                  formData.url = event.target.src
                                                  event.onerror = null
                                                }}/>}
                        </div> */}

                        {/* https://cdn-icons-png.flaticon.com/512/2609/2609282.png */}
                    </section>

                </form>
    </div>
    </>
  )
}

export default EditPost
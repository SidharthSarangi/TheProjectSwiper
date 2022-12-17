import React from "react";

const Navbar = (props) => {
  const { authToken, minimal,setShowModal, showModal, setIsSignUp } = props;
  
  const handleClick = () =>{
    setShowModal(true) ;
    setIsSignUp(false) ;
  }

  return (
    <nav>
      <div className="logo-container">
      <h2 style={{color:"white"}}>ProjectSwipe</h2>
      </div>
      {!authToken && !minimal && <button 
      className="nav-btn" 
      onClick={handleClick} 
      disabled={showModal}
      >Log in</button>}
    </nav>
  );

}


export default Navbar;

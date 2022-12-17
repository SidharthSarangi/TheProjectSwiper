import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import {useCookies} from "react-cookie" ;
import axios from "axios" ;
import Loadingspinner from "../components/Loadingspinner";

const Dashboard = () => {

    const [user, setUser] = useState(null) ;
    const [cookies, setCookie, removeCookie] = useCookies(['user']) ;
    const [stackedUsers , setStackedUsers] = useState(null);
    const userId = cookies.UserId ;
    const [isLoading, setIsLoading] = useState(false) ;

    const getUser = async () => {
      try {
          setIsLoading(true) ;
          const response = await axios.get('http://localhost:8000/user', {params: {userId}})
          setUser(response.data)
          setIsLoading(false) ;
      } catch (error) {
          console.log(error)
          setIsLoading(false) ;
      }
  }

    const getStackedUsers = async () =>{
      try {
        setIsLoading(true) ;
        const response = await axios.get('http://localhost:8000/stacked-users', {
            params: {stackshow: user?.stackinterest}
        })
        setStackedUsers(response.data) ;
        setIsLoading(false) ;
    } catch (error) {
        console.log(error) ;
        setIsLoading(false) ;
    }
    }

      useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (user) {
            getStackedUsers()
        }
    }, [user])
    // console.log('user', user) ;
    // console.log('stackeduser', stackedUsers) ;

 
  const [lastDirection, setLastDirection] = useState()

  const updateMatches = async (matchedUserId) =>{
    try {
      const response = await axios.put('http://localhost:8000/addmatch',{userId,matchedUserId})
      const response1 = await axios.put('http://localhost:8000/addshowcard',{user,matchedUserId})
      
      getUser() ;
    } catch (error) {
        console.log(error) ;
        setIsLoading(false) ;
    }
  }
  
  const swipedUpdateMatches = async (matchedUserId) =>{
    try {
      const response = await axios.put('http://localhost:8000/addmatch',{userId,matchedUserId})
      getUser() ;
    } catch (error) {
        console.log(error) ;
    }
  }
 
  const swiped = (direction, swipedUserId) => {
    if(direction === 'right'){
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const newSwiped = (direction, swipedUserId)=> {
    if(direction==='right'){
      swipedUpdateMatches(swipedUserId)
    }
    setLastDirection(direction) 
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const matchedUserIds = user?.matches.map((ele)=>ele.user_id).concat(userId)

  const filteredStackedUsers = stackedUsers?.filter(
    StackedUser => !matchedUserIds.includes(StackedUser.user_id)
  )
  
  const showCardUsers = user?.show_card.map((ele)=>ele.swiped_user) ;
  
  const userIdShowCardUsers = showCardUsers?.map((ele)=>ele.user_id) ;   
  
  const newfilteredStackedUsers = filteredStackedUsers?.filter(
    ele => !userIdShowCardUsers.includes(ele.user_id)
  )

  return (
    <>
    {user && <div className="dashboard">
      <ChatContainer user={user}/>
      <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
      <div className="swipe-container">
        {isLoading && (<Loadingspinner/>)}
        <div className="card-container">
        <h4 style={{color:"yellow",marginRight:"160px"}}>Users</h4>
          {newfilteredStackedUsers?.map((ele) => (
            <TinderCard
              className="swipe"
              key={ele.user_id}
              onSwipe={(dir) => swiped(dir, ele.user_id)}
              onCardLeftScreen={() => outOfFrame(ele.first_name)}
            >
              <div
                // style={{ backgroundImage: "url(" + ele.url + ")" }}
                style={{backgroundColor:"black",
                boxShadow: '20px 20px 19px #8caaba',
                }}
                className="card"
              >
                <h2 style={{color:"#c0ccc3"}}>{ele.first_name}</h2> 
                <span style={{color:"#8c918d"}}>#{ele.tech_use}</span> 
                <p style={{color:"white"}}>{ele.about}</p>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="card-container">
          <h4 style={{color:"yellow",marginRight:"111px"}}>Users who swiped Right On You</h4>
          {showCardUsers?.map((ele) => (
              <TinderCard
                className="swipe"
                key={ele.user_id}
                onSwipe={(dir) => newSwiped(dir, ele.user_id)}
                onCardLeftScreen={() => outOfFrame(ele.first_name)}
              >
                <div
                  // style={{ backgroundImage: "url(" + ele.url + ")" }}
                  style={{backgroundColor:"black",
                  boxShadow: '20px 20px 19px #8caaba',
                  }}
                  className="card"
                >
                  <h2 style={{color:"#c0ccc3"}}>{ele.first_name}</h2> 
                  <h5 style={{color:"#c0ccc3"}}>{ele.tech_use}</h5> 
                  <p style={{color:"white"}}>{ele.about}</p>
                </div>
              </TinderCard>
          ))}
        </div>
        </div>
    </div>}
    </>
  );
};

export default Dashboard;

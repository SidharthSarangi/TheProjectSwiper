import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';

const MatchesDisplay = (props) => {
  const {matches,setClickedUser} = props ;

  const [matchedProfiles, setMatchedProfiles] = useState(null) ;
  const [cookies, setCookie, removeCookie] = useCookies(null) ;

  const matchedUserIds = matches.map((ele)=>ele.user_id) ;
  const userId = cookies.UserId ;
 
  const getMatches = async ()=>{
    try {
      const response = await axios.get('http://localhost:8000/users',{params: { userIds: JSON.stringify(matchedUserIds) }})
      setMatchedProfiles(response.data) ;
    } catch (error) {
       console.log(error) ;
    }
  }

  useEffect(()=>{
    getMatches()
  },[matches])

  // console.log(matchedProfiles) ;
  
  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
    matchedProfile.matches.filter((profile)=> profile.user_id==userId).length>0
  )

  return (
    <div className='matches-display'>
        {
          filteredMatchedProfiles?.map((match,_index)=>(
            <div key={_index} className="match-card" onClick={()=>setClickedUser(match)}>
              <div className='img-container'>
                <img src={match?.url} alt="Profile"/>
              </div>
              <h3>{match?.first_name}</h3>
              <p>{match?.tech_known}</p>
            </div>
          ))
        }

    </div>
  )
}

export default MatchesDisplay
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Onboard from "./pages/Onboard" ;
import {BrowserRouter,Routes,Route} from "react-router-dom"; 
import { useCookies } from 'react-cookie';
import {SocketContext, socket} from './context/socket';

function App() {

  const [cookies , setCookie, removeCookie] = useCookies(['user']) ;

  const authToken = cookies.AuthToken ;
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
          {authToken && <Route path="/onboard" element={<Onboard/>}/>}
          {/* {authToken && <Route path="/edit" element={<EditPost/>}/>} */}
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;

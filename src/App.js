import "./App.css";
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'; 
//component
import Home from './web-app/Pages/Home/Home';
import SinglePage from "./web-app/Pages/SinglePage/SinglePage";
import Liked from "web-app/Pages/Liked/Liked";
import History from "web-app/Pages/History/History";
import WatchLater from "web-app/Pages/WatchLater/WatchLater";
import Playlist from "web-app/Pages/Playlist/PlayList";
import PlaylistVideo from "web-app/Pages/Playlist/PlaylistVideo";
import VideoList from "web-app/Pages/VideoList/VideoList";
import UserProfile from "web-app/Pages/UserProfile/UserProfile";
import PlayVideo from "web-app/Pages/PlayVideo/PlayVideo";
import PageNotFound from "web-app/Pages/404error/pagenotfound";
import Uploadvideo from "web-app/Pages/Uploadvideo/Uploadvideo";

//context
//import { useAuth } from './web-app/Context/login/AuthContext';
import { Toast } from "web-app/Component/Toast/Toast";
import VideoContext from "web-app/Context/video/VideoContext";
import { useContext } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";

function App() {
  //let {token} = useAuth()
  let {toastList} = useContext(VideoContext)
  const { token , user } = useSelector((store) => store.authentication);
  return (
    <div className="App">
      <Router>
         <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/videolist" element={<VideoList/>}/>
              <Route exact path="/videolist/:id" element={<SinglePage/>}/>
              <Route exact path="/videolist/:id/watch" element={<PlayVideo/>}/>
              <Route path="*" element={<PageNotFound/>}/>
               {
                 token ? <>
                 <Route exact path="/liked" element={<Liked/>}/>
                 <Route exact path="/history" element={<History/>}/>
                 <Route exact path="/watchLater" element={<WatchLater/>}/>
                 <Route exact path="/playlist" element={<Playlist/>}/>
                 <Route exact path="/playlist/:id" element={<PlaylistVideo/>}/>
                 <Route exact path="/profile" element={<UserProfile/>}/>
                 <Route exact path="/uploadvideo" element={<Uploadvideo/>}/>
                 </> :
                 <>
                    <Route exact path="/liked" element={<Home/>}/>
                    <Route exact path="/history" element={<Home/>}/>
                    <Route exact path="/watchLater" element={<Home/>}/>
                    <Route exact path="/playlist" element={<Home/>}/>
                    <Route exact path="/playlist/:id" element={<Home/>}/>
                    <Route exact path="/profile" element={<Home/>}/>
                    <Route exact path="/uploadvideo" element={<Home/>}/>
                 </>
               }

         </Routes>
        </Router> 
        <Toast data={toastList} />
    </div>
  );
}

export default App;

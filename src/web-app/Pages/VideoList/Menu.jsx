//react
import { useState,useEffect } from "react";
//component
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import Tooltip from "../../Component/ToolTip/Tooltip";
import VideoList from "./VideoList";
import Playlist from "../Playlist/PlayList";
import Liked from "../Liked/Liked";
import WatchLater from "../WatchLater/WatchLater";
import History from "../History/History";
import PlaylistVideo from "../Playlist/PlaylistVideo";

//constant
import {submenulist} from '../../Constant/videolist';
//css
import './Menu.css';
const Menu=()=>{
    const [route,setRoute]=useState("videolist")
    const [side_toggle,setside_toggle] = useState(false)


    useEffect(()=>{
      window.scrollTo({ behavior: 'smooth', top: '0px' });
        const Item=
        localStorage.getItem("route") == null
          ? "videolist"
          : localStorage.getItem("route")
  
        setRoute(Item)
  
      },[setRoute]) 
  
    return(
        <div>
            <Header/>
            <nav className="navbar">
                <button className="button-navbar-open" onClick={()=>setside_toggle(!side_toggle)}>  
                    {
                        side_toggle ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-bars"></i>
                    } 
                </button> 
            </nav>

            <div className="menu-container-grid">
              <div className={side_toggle?"sidebar-responsive":"sidebar"}>
                <div className={side_toggle?"sidebar-header flex-justify-content-flex-end":"sidebar-header"}> 
                        </div>
                <div className="sidebar-menulist">
                  <div className="sidebar__menu">
                    {
                      submenulist.map((item,index)=>{
                        return(
                          <Tooltip content={item.name}>
                            <div className={ item.route === route ?"sidebar__link active_menu_link":"sidebar__link"} 
                                key={index} onClick={() =>{setRoute(item.route); localStorage.setItem("route",item.route); setside_toggle(false);}}>
                                  <label className="sidebar_button --background"> {item.Icon} </label>
                            </div>
                          </Tooltip>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              {/* main */}
              <main id="main">
                {route === "videolist" && <VideoList/>}
                {route === "playlists" && <Playlist route={()=>setRoute("playlistvideo")}/>}
                {route === "liked" &&  <Liked/> }
                {route === "watchlater" && <WatchLater/>}
                {route === "History" && <History/>}
                {route === "playlistvideo" && <PlaylistVideo route={()=>setRoute("playlists")}/>}
              </main>
           </div> 
           <Footer/>
        </div>
    )
}
export default Menu;
import { useState ,useContext} from "react";
import { useAuth } from "web-app/Context/login/AuthContext";
import VideoContext from "web-app/Context/video/VideoContext";
import {
    handler_addPlayListName,
    handler_addVideoPlaylist,
    handler_removedVideoPlaylist} from '../../Service/service';

import './PlayList.css'    

const AddPlayList=({videoId,data})=>{
    let {token} = useAuth();
    let {addTitlePlaylist,addVideoPlaylist,removeVideoPlaylsit,playlistdata} = useContext(VideoContext);

    const [gettext,settext]=useState("")
    const [checklist , setChecklist ] = useState([])


    const addtext=(e)=>{
        if(gettext!==""){
         let get = gettext.trim()
         if(checklist.length>0 && checklist.includes(get)){
            setChecklist((prev)=>[...prev])
         }else{
            setChecklist((prev)=>[...prev,get])
            handler_addPlayListName(e,token,addTitlePlaylist,get)
            settext("")
         }
        }
    }


    const AddCheckedplaylist=(e,palylist_id)=>{
          if(e.target.checked){
            handler_addVideoPlaylist(e,palylist_id,data,token,addVideoPlaylist)
          }else{
            handler_removedVideoPlaylist(e,palylist_id,videoId,token,removeVideoPlaylsit)
          }
    }
   
   return(
       <div className="addplaylist-container"> 
         <div> 
               {
                   playlistdata.length>0 ?
               
                        <div className="table"> 
                                <div className="row-table"> 
                                        <div className="column-table">
                                              Playlist name
                                        </div>
                                        <div className="column-table">
                                               To Add Click on checkbox
                                        </div>
                                </div>
                     { playlistdata.map((item,index)=>{
                           
                            return(
                               
                                    <div className="row-table"> 
                                        <div className="column-table">
                                              <span> {item.title} </span> 
                                        </div>
                                        <div className="column-table">
                                            <input  type="checkbox" name={item.title} checked={item.videos.find(item=>item._id === videoId)} value={item.title} 
                                            onChange={(e)=>AddCheckedplaylist(e,item._id)} disabled={videoId==="addplaylist"}/>
                                        </div>
                                </div>
                            ) 
                           
                        }) 
                        }
                         </div> 
                        :  <small> No playlist added  </small> }
                   
            </div>       
            <div className="addplaylist-btn-container">
                <input type="text" value={gettext} placeholder="playlist name..." onChange={(e)=>{settext(e.target.value)}}/>
                <i className="fa-solid fa-circle-plus curser-pinter-noeffect" onClick={addtext}></i>
            </div>
       </div>
   )
}
export default AddPlayList;
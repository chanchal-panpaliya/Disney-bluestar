import { useState ,useContext,useEffect} from "react";
import VideoContext from "web-app/Context/video/VideoContext";

import './PlayList.css'   
//redux
import { useDispatch, useSelector } from "react-redux";
import {createplaylist,addVideoToplaylist,deleteVideoplaylist} from '../../Redux/Reducer/playlistSlice';



const AddPlayList=({videoId,data})=>{
    let {toastdispatch} = useContext(VideoContext);

    const [gettext,settext]=useState("")
    const [checklist , setChecklist ] = useState([])

    //redux
    const { playlist } = useSelector((store) => store.playlist);
    const { token , user } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();


    useEffect(()=>{
              if(playlist.length>0){
                    let array = playlist.map((item)=>{
                        return item.title
                    })
                   
                    setChecklist(array)
              }
    },[setChecklist])


    const addtext=(e)=>{
        if(gettext.trim().length!==0){
            let get = gettext.trim() 
                if(checklist.length>0 && checklist.includes(get)){
                    setChecklist((prev)=>[...prev])
                }else{
                    setChecklist((prev)=>[...prev,get])
                    dispatch(createplaylist([e,token,get,toastdispatch]))
                    settext("")
                }
            }
    }


    const AddCheckedplaylist=(e,palylist_id)=>{
          if(e.target.checked){
            dispatch(addVideoToplaylist([e,palylist_id,data,token,toastdispatch]))
          }else{
            dispatch(deleteVideoplaylist([e,palylist_id,videoId,token,toastdispatch]))
          }
    }


   return(
       <div className="addplaylist-container"> 
         <div> 
               {
                   playlist.length>0 ?
               
                        <div className="table"> 
                                <div className="row-table"> 
                                        <div className="column-table">
                                              Playlist name
                                        </div>
                                        <div className="column-table">
                                               To Add Click on checkbox
                                        </div>
                                </div>
                     { playlist.map((item,index)=>{
                           
                            return(
                               
                                    <div className="row-table" key={index}> 
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
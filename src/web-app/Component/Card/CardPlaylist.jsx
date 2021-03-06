//react
import { useContext ,useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import temp_img from '../../img/movie-banner/movie-banner.jpg'
//css
import './Card.css';
//component
//service
import { handler_deletePlaylist , handler_removedVideoPlaylist } from 'web-app/Service/service';
//context
import VideoContext from 'web-app/Context/video/VideoContext';

//redux
import { useDispatch, useSelector } from "react-redux";
import {deleteplaylist,deleteVideoplaylist} from '../../Redux/Reducer/playlistSlice';


const Playlist_Container_Card=({data,route})=>{
    let {singlePlaylist,toastdispatch} = useContext(VideoContext)
    let length = data.videos.length
    // redux
    const dispatch = useDispatch();
    const { token , user } = useSelector((store) => store.authentication);
    return(
         <div className='card'> 
               <div className='playlist-name curser-pointer-noeffect'>
                 {
                     length>0 ?
                     <Link to={`/playlist/${data._id}`} onClick={()=>{singlePlaylist(data._id); localStorage.setItem("route","playlistvideo")}} >
                        {data.title} ({length})
                     </Link> :
                      <div className='--background' onClick={()=>toastdispatch({type:'WARNING',payload:"No data in playlist"})}>
                            {data.title} ({length})
                      </div>
                 }  
               
               </div>
               <div className='playlist-container'>
                   
               </div>
                     <img className='videolist-img' src={temp_img} onClick={()=>{singlePlaylist(data._id); localStorage.setItem("route","playlistvideo")}}/>
               <div className="video-card-bottom video-more palylist-icon-delete">
                        <button className="fa-solid fa-ellipsis-vertical videolist-button-more"> <i className="fa-solid fa-trash-can --color-primary"></i> </button>
                            <div className="dropdown-video-more">
                                <button className='--background video-label-hover' 
                                onClick={(e)=>{dispatch(deleteplaylist([e,data._id,token,toastdispatch]))}}
                                > Delete </button>
                            </div>  
                </div>
        </div>   
 )  
}

const VideoPlaylistCard=({data})=>{
    let {singlePlaylistId,toastdispatch} = useContext(VideoContext)
    const dispatch = useDispatch();
    const { token , user } = useSelector((store) => store.authentication);
    return(
        <div className='videolist-card'> 
             <Link to={"/videolist/"+data._id} onClick={()=>{window.scrollTo({ behavior: 'smooth', top: '0px' });}}> 
               <img className='videolist-img' src={data.thumbnail.land} /> 
             </Link>
               <div className="videolist-content">
                   <img className='videolist-smallimg border-radius-round' src={data.creatorLogo.url} atl={data.creatorLogo.altText}/>
                   <div className="video-card-title"> {data.creator} </div>
                   <div className="video-card-bottom video-more">
                        <button className="fa-solid fa-ellipsis-vertical videolist-button-more"> </button>
                            <div className="dropdown-video-more">
                                <button className='--background video-label-hover' 
                                onClick={(e)=>dispatch(deleteVideoplaylist([e,singlePlaylistId,data._id,token,toastdispatch]))}
                                
                                deleteVideoplaylist
                                > Remove from playlist </button>
                            </div>  
                    </div>
               </div> 
        </div>
)  
}



export {Playlist_Container_Card,VideoPlaylistCard}
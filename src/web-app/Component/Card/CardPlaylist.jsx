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
import { useAuth } from 'web-app/Context/login/AuthContext';


const Playlist_Container_Card=({data,route})=>{
    let {singlePlaylist,deleteplaylist} = useContext(VideoContext)
    let {token} = useAuth()
    let length = data.videos.length

    return(
         <div className='card'> 
               <div className='playlist-name'>
               <Link to={`/playlist/${data._id}`} onClick={()=>{singlePlaylist(data._id); localStorage.setItem("route","playlistvideo")}} >
                    {data.title} ({length})
               </Link>
               </div>
               <div className='playlist-container'>
                   
               </div>
                     <img className='videolist-img' src={temp_img} onClick={()=>{singlePlaylist(data._id); localStorage.setItem("route","playlistvideo")}}/>
               <div className="video-card-bottom video-more palylist-icon-delete">
                        <button className="fa-solid fa-ellipsis-vertical videolist-button-more"> <i className="fa-solid fa-trash-can --color-primary"></i> </button>
                            <div className="dropdown-video-more">
                                <button className='--background video-label-hover' onClick={(e)=>handler_deletePlaylist(e,data._id,token,deleteplaylist)} > Delete </button>
                            </div>  
                </div>
        </div>   
 )  
}

const VideoPlaylistCard=({data})=>{
    let {removeVideoPlaylsit,singlePlaylistId} = useContext(VideoContext)
    let {token} = useAuth()
    return(
        <div className='videolist-card'> 
             <Link to={"/videolist/"+data._id} > 
               <img className='videolist-img' src={data.thumbnail.land} /> 
             </Link>
               <div className="videolist-content">
                   <img className='videolist-smallimg border-radius-round' src={data.creatorLogo.url} atl={data.creatorLogo.altText}/>
                   <div className="video-card-title"> {data.creator} </div>
                   <div className="video-card-bottom video-more">
                        <button className="fa-solid fa-ellipsis-vertical videolist-button-more"> </button>
                            <div className="dropdown-video-more">
                                <button className='--background video-label-hover' onClick={(e)=>handler_removedVideoPlaylist(e,singlePlaylistId,data._id,token,removeVideoPlaylsit)}> Remove from playlist </button>
                            </div>  
                    </div>
               </div> 
        </div>
)  
}



export {Playlist_Container_Card,VideoPlaylistCard}
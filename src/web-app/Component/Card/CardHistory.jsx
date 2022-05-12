//react
import { useContext ,useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
//css
import './Card.css';
//component
import { Playlist_Modal ,Auth_Modal} from '../Modal/Modal';
import VideoContext from 'web-app/Context/video/VideoContext';
import { useAuth } from 'web-app/Context/login/AuthContext';
import { handler_addWatchLater ,handler_removeWatchLater} from 'web-app/Service/service';


const HistoryCard=({data})=>{
    let {addwatchlist,removedwatchlist,watchlist} = useContext(VideoContext)
    let {token} = useAuth()
    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    
    let check = watchlist.length>0 && watchlist.find(item=>item._id === data._id)  

    return(
        <>
        <div className='videolist-card'> 
               <img className='videolist-img' src={data.thumbnail.land} /> 
               <div className="videolist-content">
                   <img className='videolist-smallimg border-radius-round' src={data.creatorLogo.url} atl={data.creatorLogo.altText}/>
                   <div className="video-card-title"> {data.creator} </div>
                   <div className="video-card-bottom video-more">
                        <button className="fa-solid fa-ellipsis-vertical videolist-button-more"> </button>
                            <div className="dropdown-video-more">
                                <button className='--background video-label-hover' onClick={()=>setpaylist(!ispalylistmodal)}> Add palylist list </button>
                                {
                                    token?
                                      check?
                                        <button className='--background video-label-hover' onClick={()=>handler_removeWatchLater(token, removedwatchlist, data._id)}>removed Watch</button>
                                        :
                                        <button className='--background video-label-hover' onClick={()=>handler_addWatchLater(token, addwatchlist, data)}>add Watch</button>
                                       :
                                       <button className='--background video-label-hover' onClick={()=>{setmodal(!ismodal)}}>without login</button>  
                                }
                            </div>  
                    </div>
               </div> 
        </div>
        {ispalylistmodal?
                <Playlist_Modal videoid={data._id} data={data} modalClose={()=>setpaylist(false)} /> : null }
         {
             ismodal ? <Auth_Modal modalClose={()=>setmodal(false)}/> :null
         }
        </>
)  
}


export {HistoryCard}
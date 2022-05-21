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
import Tooltip from '../ToolTip/Tooltip';

const VideoCard=({data})=>{
    let {addwatchlist,removedwatchlist,watchlist} = useContext(VideoContext)
    let {token} = useAuth()
    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    
    let check = watchlist.length>0 && watchlist.find(item=>item._id === data._id)  
    return(
          <>
               <div className="video-card flex-col"> 
                        <Link to={"/videolist/"+data._id} onClick={()=>{window.scrollTo({ behavior: 'smooth', top: '0px' });}}> 
                                <div className="video-card-image" 
                                    style={{backgroundImage:`url(${data.thumbnail.url})`
                                    }}
                                >
                                </div>
                        </Link>
                        <div className="card-vertical-body">
                               <Tooltip content={"add playlist"}> 
                                   <i className="fa-solid fa-circle-plus --background curser-pointer-noeffect" onClick={()=>setpaylist(!ispalylistmodal)}> </i>
                               </Tooltip>
                                {
                                    token?
                                      check?
                                        <Tooltip content={"remove watchlist"}> 
                                            <i style={{color:'green'}} className="fa-solid fa-circle-check curser-pointer-noeffect --background"  onClick={()=>handler_removeWatchLater(token, removedwatchlist, data._id)}></i>
                                        </Tooltip>
                                        :
                                        <Tooltip content={"add watchlist"}> 
                                            <i className="fa-solid fa-plus  --background curser-pointer-noeffect" onClick={()=>handler_addWatchLater(token, addwatchlist, data)}></i>
                                        </Tooltip>
                                       :
                                       <Tooltip content={"login"}> 
                                       <i className="fa-solid fa-plus  --background curser-pointer-noeffect" onClick={()=>{setmodal(!ismodal)}}></i>
                                       </Tooltip>
                                }
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


const VideoListCard=({data})=>{
    let {addwatchlist,removedwatchlist,watchlist,viewcount} = useContext(VideoContext)
    let {token} = useAuth()
    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    
    let check = watchlist.length>0 && watchlist.find(item=>item._id === data._id) 
    let getview = viewcount.length>0 && viewcount.filter((item)=>item._id===data._id) 
     console.log("card===>",getview)
    return(
        <>
        <div className='card videolist-card' style={{overflow:'unset'}}> 
               <div className='card-uploaded-date'>
                    <label> {data.uploadedOn} </label>
                    <label> {data.duration} </label>
               </div>
               <Link to={"/videolist/"+data._id} > 
                    <img className='videolist-img' src={data.thumbnail.land} onClick={()=>{window.scrollTo({ behavior: 'smooth', top: '0px' });}}/> 
               </Link>
               <div className="videolist-content">
                   
                   <img className='videolist-smallimg border-radius-round' src={data.creatorLogo.url} atl={data.creatorLogo.altText}/>
                   <div className="video-card-title"> {data.title} | {getview.length>0?`${getview[0].view} views`:null}  </div>
 
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
                                       <button className='--background video-label-hover' onClick={()=>{setmodal(!ismodal)}}>add Watch</button>  
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

const Vertical_Slider_Card=({data})=>{
    return(
        <div className='videolist-card'> 
               <Link to={"/videolist/"+data._id} onClick={()=>{window.scrollTo({ behavior: 'smooth', top: '0px' });}}> 
                    <img className='videolist-img' src={data.thumbnail.land} /> 
               </Link>
               <div className="videolist-content">
                   <img className='videolist-smallimg border-radius-round' src={data.creatorLogo.url} atl={data.creatorLogo.altText}/>
                   <div className="video-card-title"> {data.creator} </div>
                   <div className="video-card-bottom video-more">
                        <button className="fa-solid fa-ellipsis-vertical videolist-button-more">  </button>
                        <div className="dropdown-video-more">
                            <label className='--background video-label-hover'> Add palylist list </label>
                            <label className='--background video-label-hover'> Watch Later </label>
                        </div>  
                    </div>
               </div> 
        </div>
   )  
}

const EpisodeVideoListCard=({data})=>{
    let {addwatchlist,removedwatchlist,watchlist,getEpisodeVideoId} = useContext(VideoContext)
    let {token} = useAuth()
    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    
    let check = watchlist.length>0 && watchlist.find(item=>item._id === data._id)  
    return(
        <>
        <div className='videolist-card'> 
                            <div className="video-card-bottom video-more">
                                <button className="fa-solid fa-list-ul videolist-button-more"> </button>
                                    <div className="dropdown-video-more">
                                        <button className='--background video-label-hover' onClick={()=>setpaylist(!ispalylistmodal)}> Add to Playlist </button>
                                        {
                                            token?
                                            check?
                                                <button className='--background video-label-hover' onClick={()=>handler_removeWatchLater(token, removedwatchlist, data._id)}> Remove from Watchlist </button>
                                                :
                                                <button className='--background video-label-hover' onClick={()=>handler_addWatchLater(token, addwatchlist, data)}> Add to Watchlist </button>
                                            :
                                            <button className='--background video-label-hover' onClick={()=>{setmodal(!ismodal)}}> Add to Watchlist </button>  
                                        }
                            </div>  
                    </div>
               <Link to={"/videolist/"+data._id} onClick={()=>{window.scrollTo({ behavior: 'smooth', top: '0px' });}}> 
                    <img className='videolist-img' src={data.thumbnail.land}/> 
               </Link>
               <div className="videolist-content">
                   <img className='videolist-smallimg border-radius-round' src={data.creatorLogo.url} atl={data.creatorLogo.altText}/>
                   <div className="video-card-title"> 
                        <label className='--background'> {data.title} </label>
                        <label className='--background'>  {data.episode_id!=="" && `(${data.episode_id})` }</label> 
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


export {VideoCard,VideoListCard,Vertical_Slider_Card,EpisodeVideoListCard}
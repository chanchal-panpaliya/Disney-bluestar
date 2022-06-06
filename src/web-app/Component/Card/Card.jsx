//react
import { useContext ,useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
//css
import './Card.css';
//component
import { Playlist_Modal ,Auth_Modal} from '../Modal/Modal';
import VideoContext from 'web-app/Context/video/VideoContext';
import Tooltip from '../ToolTip/Tooltip';
//redux
import { addWatchlistData , removeWatchlistData} from '../../Redux/Reducer/watchSlice';
import { useDispatch, useSelector } from "react-redux";

const VideoCard=({data})=>{
    let {toastdispatch} = useContext(VideoContext)
    //let {token} = useAuth()
    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    //redux
    const { watchlist } = useSelector((store) => store.watch);
    const { token , user } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();
 
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
                                            <i style={{color:'green'}} className="fa-solid fa-circle-check curser-pointer-noeffect --background"  
                                            onClick={()=>dispatch(removeWatchlistData([data._id,toastdispatch]))}
                                            ></i>
                                        </Tooltip>
                                        :
                                        <Tooltip content={"add watchlist"}> 
                                            <i className="fa-solid fa-plus  --background curser-pointer-noeffect" 
                                            onClick={()=>dispatch(addWatchlistData([data,toastdispatch]))}
                                            ></i>
                                        </Tooltip>
                                       :
                                       <Tooltip content={"add watchlist"}> 
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
    let {viewcount,toastdispatch} = useContext(VideoContext)
    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    //redux
    const { watchlist } = useSelector((store) => store.watch);
    const { token , user } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();
    //
    let check = watchlist.length>0 && watchlist.find(item=>item._id === data._id) 
    let getview = viewcount.length>0 && viewcount.filter((item)=>item._id===data._id) 
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
                                        <button className='--background video-label-hover' 
                                        onClick={()=>dispatch(removeWatchlistData([data._id,toastdispatch]))}
                                        >removed Watch</button>
                                        :
                                        <button className='--background video-label-hover' 
                                        onClick={()=>dispatch(addWatchlistData([data,toastdispatch]))}
                                        >add Watch</button>
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
    let {toastdispatch} = useContext(VideoContext)
    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    //redux
    const { watchlist } = useSelector((store) => store.watch);
    const { token , user } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();
    
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
                                                <button className='--background video-label-hover' 
                                                onClick={()=>dispatch(removeWatchlistData([data._id,toastdispatch]))}
                                                > Remove from Watchlist </button>
                                                :
                                                <button className='--background video-label-hover' 
                                                onClick={()=>dispatch(addWatchlistData([data,toastdispatch]))}
                                                > Add to Watchlist </button>
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
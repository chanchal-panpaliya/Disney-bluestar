import { useContext,useEffect,useState ,} from "react"
import VideoContext from "web-app/Context/video/VideoContext"
import { fetchAllPlaylistData,handler_removedVideoPlaylist ,
  fetch_single_video,fetchAllVideoData ,handler_addWatchLater ,handler_removeWatchLater 
  ,addVideoToLikedVideos,removeFromlikedVideos,handler_addVideoHistory} from "web-app/Service/service"
import { useAuth } from 'web-app/Context/login/AuthContext';
import Loader from "../../Component/Loader/Loader";
import { VideoPlaylistCard } from "web-app/Component/Card/CardPlaylist";
import Tooltip from "../../Component/ToolTip/Tooltip";
import { Link ,useParams , useNavigate} from "react-router-dom";
import Footer from "web-app/Component/Footer/Footer";
import Header from "web-app/Component/Header/Header";
import {ShareModal} from '../../Component/Modal/Modal';
//img
import liked_img from '../../img/images/temp/playvideo5.png';
import SliderCard_Vertical from "web-app/Component/SliderCard/SliderCard-V";


const PlaylistVideo = ({route}) =>{
     const {id} = useParams();
     let navigator = useNavigate();
    let{PlaylistId,removeVideoPlaylsit,
      addwatchlist,removedwatchlist,watchlist,add_liked,removed_liked,liked,viewcount,uploadedvideo,CountVideoView,add_history,getContinueWatchItem} = useContext(VideoContext)
    let {token} = useAuth()
    const [loader,setloader]=useState(false)
    const [data,setdata]=useState([])
    const [playlistname,setplaylistname]=useState("")
    const [currentvideo,securrentvideo]=useState("");
    const [isshare,setshare]=useState(false)
  
 
    useEffect(()=>{
      let time = setTimeout(()=>{
          fetchAllPlaylistData(token).then((res)=>{
            let data = res.data.playlists
            if(data.length>0){
            let datafilter = data.filter(item=>item._id === PlaylistId)
            setplaylistname(datafilter[0].title)
            setdata(datafilter[0].videos)
            securrentvideo(datafilter[0].videos[0])
            CountVideoView(datafilter[0].videos[0])
            getContinueWatchItem(datafilter[0].videos[0])
            handler_addVideoHistory(token,datafilter[0].videos[0],add_history) 
            }
         })
      },0)
         return ()=> clearTimeout(time)
      },[])

      useEffect(()=>{
        fetchAllPlaylistData(token).then((res)=>{
          let data = res.data.playlists
          if(data.length>0){
          let datafilter = data.filter(item=>item._id === PlaylistId)
          setdata(datafilter[0].videos)
          }
       })  
      },[data])

      const renderView=(id)=>{
        let getview = viewcount.length>0 && viewcount.filter((item)=>item._id===id)
        return(
          getview.length>0 ? <div className='--background'> <i class="fa-solid fa-eye"></i> {getview[0].view} view </div> : null
        )
          
    }


   return(
    <div>
      <Header/>
          <div className='page-container-palylist'>
             <div className='page-data-display-palylist'>
                 <header className='like-page-header-palylist'>
                     <img className='like-page-round-circle-palylist' src={liked_img} />
                     <span className="like-page-title-palylist"> {playlistname}  </span>
                 </header>
                 <section className='like-page-body-palylist'>
                  <Tooltip content={"back playlist"}>
                    <Link to={`/playlist`}>
                      <button className="fa fa-arrow-left" onClick={()=>{route(); localStorage.setItem("route","playlists")}}>  </button>
                    </Link>
                  </Tooltip> 
                {loader? <Loader/> : data.length>0? 
                  <div className="playlist-v-container --background ">
                      <div className="playlist-v-main-video --background">
                             <iframe
                                    className="playlist-iframe"
                                    src={`https://www.youtube.com/embed/${currentvideo.videoYTId}?autoplay=1`} 
                                    title="YouTube video player" frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                             </iframe> 
                             <h3 className="playlist-v-title --background">
                                    {currentvideo.title}
                             </h3>
                             <div className='flex-row --background col-gap-2rem typography-padding-top-right-bottom-left'>
                                       
                                           {   renderView(currentvideo._id)  }
                                       {
                                            token ? liked.length>0 && liked.find(item=>item._id === currentvideo._id)?
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i style={{color:'green'}} className="fa-solid fa-thumbs-up --background" onClick={()=>removeFromlikedVideos(token, removed_liked, currentvideo._id)}></i>
                                                <label className='--background --background'> like </label>
                                            </span> :
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i className="fa-solid fa-thumbs-down --background"  onClick={()=>addVideoToLikedVideos(token, add_liked,currentvideo)}></i>
                                                <label className='--background'>unlike</label>
                                            </span> :
                                            <span> not login </span>
                                        }

                                        {
                                            token ? watchlist.length>0 && watchlist.find(item=>item._id === currentvideo._id)?
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i style={{color:'green'}} className="fa-solid fa-circle-check --background" onClick={()=>handler_removeWatchLater(token, removedwatchlist, currentvideo._id)}></i>
                                                <label className='--background --background'> watchlist </label>
                                            </span> :
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i className="fa-solid fa-plus --background" onClick={()=>handler_addWatchLater(token, addwatchlist,currentvideo)}></i>
                                                <label className='--background'>watchlist</label>
                                            </span> :
                                              <span> not login </span>
                                        }
                                        

                                        <span className='flex-col row-gap-0.5rem --background'>
                                            <i className="fa-solid fa-share-nodes --background" onClick={()=>setshare(!isshare)}></i>
                                            <label className='--background'>share</label>
                                        </span>
                                </div>

                      </div>
                      
                      { 
                              <div className="playlist-v-list --background">
                                  {data.map((item,index)=>{
                                  return (
                                    <div key={index} className={item._id === currentvideo._id?"palylist-videos palylist-active":"palylist-videos"} 
                                      onClick={()=>{
                                          securrentvideo(item);
                                          CountVideoView(item);
                                          getContinueWatchItem(item);
                                          handler_addVideoHistory(token,item,add_history) 
                                      }}>
                                      <img className="palylist-videos-img" src={item.thumbnail.land} alt="temp"/> 
                                      <h3 className="playlist-v-title --background">
                                            {item.title} 
                                      </h3>
                                      <div className="video-card-bottom video-more">
                                        <button className="fa-solid fa-ellipsis-vertical videolist-button-more"> </button>
                                            <div className="dropdown-video-more">
                                                <button className='--background video-label-hover' onClick={(e)=>handler_removedVideoPlaylist(e,id,item._id,token,removeVideoPlaylsit)}> Remove from playlist </button>
                                            </div>  
                                    </div>
                                    </div>
                                  )
                                  }) }
                            </div>
                      }
                           
                  </div> : <div className="--background data-not-display flex-col row-gap-2rem flex-justify-content-center"> 
                     <label> no data found</label>  
                    <button className='button header-button-login' onClick={()=>{navigator('/')}}> add video </button> 
                    </div>}    
                 </section>
            </div>
          </div>

      

         {
             isshare ? <ShareModal data={currentvideo} modalClose={()=>setshare(false)}/> : null
         }
        <Footer/>
      </div>
   )
}
export default PlaylistVideo
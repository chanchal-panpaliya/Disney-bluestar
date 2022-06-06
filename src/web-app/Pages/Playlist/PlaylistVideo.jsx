import { useContext,useEffect,useState ,} from "react"
import VideoContext from "web-app/Context/video/VideoContext"

import Loader from "../../Component/Loader/Loader";

import Tooltip from "../../Component/ToolTip/Tooltip";
import { Link ,useParams , useNavigate} from "react-router-dom";
import Footer from "web-app/Component/Footer/Footer";
import Header from "web-app/Component/Header/Header";
import {ShareModal} from '../../Component/Modal/Modal';
//img
import liked_img from '../../img/images/temp/playvideo5.png';

//redux
import { useDispatch, useSelector } from "react-redux";
import { addHistoryData } from 'web-app/Redux/Reducer/historySlice';
import { addLikedData ,removeLikedData } from '../../Redux/Reducer/likeSlice';
import { addWatchlistData , removeWatchlistData } from '../../Redux/Reducer/watchSlice';
import {deleteVideoplaylist} from '../../Redux/Reducer/playlistSlice';

const PlaylistVideo = ({route}) =>{
     const {id} = useParams();
     let navigator = useNavigate();
    let{PlaylistId,viewcount,CountVideoView,getContinueWatchItem,toastdispatch} = useContext(VideoContext)

    // redux
    const dispatch = useDispatch();
    const { likedlist } = useSelector((store) => store.likes);
    const { watchlist } = useSelector((store) => store.watch);
    const { playlist } = useSelector((store) => store.playlist);
    const { token , user } = useSelector((store) => store.authentication);

    const [loader,setloader]=useState(false)
    const [data,setdata]=useState(playlist.length>0?(playlist.filter(item=>item._id === PlaylistId))[0].videos:[])
    const [playlistname,setplaylistname]=useState(playlist.length>0?(playlist.filter(item=>item._id === PlaylistId))[0].title:"")
    const [currentvideo,securrentvideo]=useState(playlist.length>0?(playlist.filter(item=>item._id === PlaylistId))[0].videos[0]:"");
    const [isshare,setshare]=useState(false)

    useEffect(()=>{
      let time = setTimeout(()=>{          
            if(playlist.length>0){
            let datafilter = playlist.filter(item=>item._id === PlaylistId)
            securrentvideo(datafilter[0].videos[0])
            CountVideoView(datafilter[0].videos[0])
            getContinueWatchItem(datafilter[0].videos[0])
            //redux
            dispatch(addHistoryData(datafilter[0].videos[0]))
            }
         
      },0)
         return ()=> clearTimeout(time)
      },[securrentvideo])

      useEffect(()=>{
          if(playlist.length>0){
            let datafilter = playlist.filter(item=>item._id === PlaylistId)
            setdata(datafilter[0].videos)
          }
      },[data,setdata])

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
                {loader? <Loader/> : (playlist.filter(item=>item._id === PlaylistId))[0].videos.length>0? 
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
                                            token ? likedlist.length>0 && likedlist.find(item=>item._id === currentvideo._id)?
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i style={{color:'green'}} className="fa-solid fa-thumbs-up --background" 
                                                onClick={()=>dispatch(removeLikedData([currentvideo._id,toastdispatch]))}
                                                ></i>
                                                <label className='--background --background'> like </label>
                                            </span> :
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i className="fa-solid fa-thumbs-down --background"  
                                                onClick={()=>dispatch(addLikedData([currentvideo,toastdispatch]))}
                                                ></i>
                                                <label className='--background'>unlike</label>
                                            </span> :
                                            <span> not login </span>
                                        }

                                        {
                                            token ? watchlist.length>0 && watchlist.find(item=>item._id === currentvideo._id)?
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i style={{color:'green'}} className="fa-solid fa-circle-check --background" 
                                                onClick={()=>dispatch(removeWatchlistData([currentvideo._id,toastdispatch]))}
                                                ></i>
                                                <label className='--background --background'> watchlist </label>
                                            </span> :
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i className="fa-solid fa-plus --background" 
                                                onClick={()=>dispatch(addWatchlistData([currentvideo,toastdispatch]))}
                                                ></i>
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
                                  {(playlist.filter(item=>item._id === PlaylistId))[0].videos.map((item,index)=>{
                                  return (
                                    <div key={index} className={item._id === currentvideo._id?"palylist-videos palylist-active":"palylist-videos"} 
                                      onClick={()=>{
                                          securrentvideo(item);
                                          {(playlist.filter(item=>item._id === PlaylistId))[0].videos.length>1&&CountVideoView(item)}
                                          getContinueWatchItem(item);
                                          dispatch(addHistoryData(item))
                                      }}>
                                      <img className="palylist-videos-img" src={item.thumbnail.land} alt="temp"/> 
                                      <h3 className="playlist-v-title --background">
                                            {item.title} 
                                      </h3>
                                      <div className="video-card-bottom video-more">
                                        <button className="fa-solid fa-ellipsis-vertical videolist-button-more"> </button>
                                            <div className="dropdown-video-more">
                                                <button className='--background video-label-hover' 
                                                onClick={(e)=> dispatch(deleteVideoplaylist([e,id,item._id,token,toastdispatch]))}
                                                > Remove from playlist </button>
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
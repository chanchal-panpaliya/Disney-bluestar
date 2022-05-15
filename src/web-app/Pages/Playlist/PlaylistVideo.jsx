import { useContext,useEffect,useState ,} from "react"
import VideoContext from "web-app/Context/video/VideoContext"
import { fetchAllPlaylistData,handler_removedVideoPlaylist } from "web-app/Service/service"
import { useAuth } from 'web-app/Context/login/AuthContext';
import Loader from "../../Component/Loader/Loader";
import { VideoPlaylistCard } from "web-app/Component/Card/CardPlaylist";
import Tooltip from "../../Component/ToolTip/Tooltip";
import { Link ,useParams , useNavigate} from "react-router-dom";
import Footer from "web-app/Component/Footer/Footer";
import Header from "web-app/Component/Header/Header";
//img
import liked_img from '../../img/images/temp/playvideo5.png';
import SliderCard_Vertical from "web-app/Component/SliderCard/SliderCard-V";


const PlaylistVideo = ({route}) =>{
     const {id} = useParams();
     let navigator = useNavigate();
    let{PlaylistId,removeVideoPlaylsit} = useContext(VideoContext)
    let {token} = useAuth()
    const [loader,setloader]=useState(false)
    const [data,setdata]=useState([])
    const [playlistname,setplaylistname]=useState("")
    const [currentvideo,securrentvideo]=useState("");


    useEffect(()=>{
      let time = setTimeout(()=>{
          fetchAllPlaylistData(token).then((res)=>{
            let data = res.data.playlists
            let datafilter = data.filter(item=>item._id === PlaylistId)
            setplaylistname(datafilter[0].title)
            setdata(datafilter[0].videos)
            securrentvideo(datafilter[0].videos[0])
         })
      },0)
         return ()=> clearTimeout(time)
      },[])

      useEffect(()=>{
        fetchAllPlaylistData(token).then((res)=>{
          let data = res.data.playlists
          let datafilter = data.filter(item=>item._id === PlaylistId)
          setdata(datafilter[0].videos)
       })  
      },[data])

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
                      </div>
                      
                      { 
                              <div className="playlist-v-list --background">
                                  {data.map((item,index)=>{
                                  return (
                                    <div key={index} className={item._id === currentvideo._id?"palylist-videos palylist-active":"palylist-videos"} onClick={()=>{securrentvideo(item)}}>
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
                           
                  </div> : <div> no data found <button className='button header-button-login' onClick={()=>{navigator('/')}}> add video </button> </div>}    
                 </section>
            </div>
          </div>
        <Footer/>
      </div>
   )
}
export default PlaylistVideo
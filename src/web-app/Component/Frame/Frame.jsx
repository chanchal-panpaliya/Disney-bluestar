import { Link } from 'react-router-dom'
import { useContext , useState } from 'react';
import './Frame.css'
import {  handler_addWatchLater ,handler_removeWatchLater , handler_addVideoHistory} from 'web-app/Service/service';
import { Playlist_Modal ,Auth_Modal,AddNote_Modal,ShareModal} from '../../Component/Modal/Modal';
import { useAuth } from 'web-app/Context/login/AuthContext';
import VideoContext from 'web-app/Context/video/VideoContext';
import DisplayNote from '../AddNote/DisplayNote';
const Frame=({data,Noteval,openNote,closeNote})=>{
    let {token} = useAuth()
    let {add_history,addwatchlist,removedwatchlist,watchlist,CountVideoView,getContinueWatchItem} = useContext(VideoContext)

    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    const [isshare,setshare]=useState(false)
    
   
    const handleOpenVideo=()=>{
           if(token){
                handler_addVideoHistory(token,data,add_history)
           }
    }

    return(
    <div className="carousel-container">
     <DisplayNote id={data._id} closeNote={closeNote} sidemenu={Noteval}/>
    <div className="carousel">
        <div className="frame-slider">
            <div className="slide-content">
                <h1 className="movie-title">{data.title} {data.categoryName === "Shows" ? " - "+ data.episode_id : null}</h1>
                <div className='flex-row col-gap-1rem typology-padding-top --background'>
                     <label className='--background'> {data.duration} </label>
                     <label className='--background'> {data.year} </label> 
                     <label className='--background'> {data.categoryType} </label> 
                     <label className='--background'> {data.language} </label> 
                     <label className='--background'> {data.UA} </label>
                </div>
                <p className="movie-des">{data.description}</p>
                
                <div className='movie-content'>
                      <span className='flex-row col-gap-1rem --background'> 
                          <label className='--background'> Watch {data.categoryName} </label>
                          <Link to={`/videolist/${data._id}/watch`} className="fa-solid fa-play" 
                          onClick={()=>{CountVideoView(data);getContinueWatchItem(data);handleOpenVideo()}}></Link>
                      </span>
                    
                      <div className='flex-row --background col-gap-2rem'>
                            {
                                token ? watchlist.length>0 && watchlist.find(item=>item._id === data._id)?
                                <span className='flex-col row-gap-0.5rem --background'>
                                    <i style={{color:'green'}} className="fa-solid fa-circle-check --background curser-pointer-noeffect" onClick={()=>handler_removeWatchLater(token, removedwatchlist, data._id)}></i>
                                    <label className='--background --background'> watchlist </label>
                                 </span> :
                                <span className='flex-col row-gap-0.5rem --background'>
                                    <i className="fa-solid fa-plus --background curser-pointer-noeffect" onClick={()=>handler_addWatchLater(token, addwatchlist, data)}></i>
                                    <label className='--background'>watchlist</label>
                                </span> :
                                 <span className='flex-col row-gap-0.5rem --background'>
                                    <i className="fa-solid fa-plus --background curser-pointer-noeffect" onClick={()=>{setmodal(!ismodal)}}></i>
                                    <label className='--background'>watchlist</label>
                                </span>
                            }
                            

                            <span className='flex-col row-gap-0.5rem --background'>
                                <i className="fa-solid fa-circle-plus --background curser-pointer-noeffect" onClick={()=>setpaylist(!ispalylistmodal)}></i>
                                <label className='--background'>playlist</label>
                            </span>
                            
                            <span className='flex-col row-gap-0.5rem --background'>
                                <i className="fa-solid fa-share-nodes --background curser-pointer-noeffect" onClick={()=>setshare(!isshare)}></i>
                                <label className='--background'>share</label>
                            </span>

                            <span className='flex-col row-gap-0.5rem --background'>
                                <i className="fa-solid fa-note-sticky --background curser-pointer-noeffect" onClick={openNote}></i>
                                <label className='--background'> add note </label>
                            </span>
                            {/*  */}
                      </div>
                      
                </div>
            </div>
            <img src={data.thumbnail.land} alt="temp"/>
        </div>
    </div>
         {ispalylistmodal? <Playlist_Modal videoid={data._id} data={data} modalClose={()=>setpaylist(false)} /> : null }
         {
             ismodal ? <Auth_Modal modalClose={()=>setmodal(false)} /> :null
         }
         {
             isshare ? <ShareModal data={data} modalClose={()=>setshare(false)}/> : null
         }
</div>
    )
}

export default Frame
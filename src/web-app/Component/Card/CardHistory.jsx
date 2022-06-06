//react
import { useContext ,useState ,useEffect} from 'react';
//css
import './Card.css';
//component
import { Playlist_Modal ,Auth_Modal} from '../Modal/Modal';
import VideoContext from 'web-app/Context/video/VideoContext';
//redux
import { addWatchlistData , removeWatchlistData} from '../../Redux/Reducer/likeSlice';
import { useDispatch, useSelector } from "react-redux";

const HistoryCard=({data})=>{
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
                                        <button className='--background video-label-hover' 
                                        onClick={()=>dispatch(removeWatchlistData([data._id,toastdispatch]))}
                                        >removed Watch</button>
                                        :
                                        <button className='--background video-label-hover' 
                                        onClick={()=>dispatch(addWatchlistData([data,toastdispatch]))}
                                        >add Watch</button>
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
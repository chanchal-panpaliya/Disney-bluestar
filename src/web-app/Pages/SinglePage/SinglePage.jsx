import './SinglePage.css';
import '../Home/Home.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
//service
import { fetch_single_video,fetchAllVideoData ,handler_addWatchLater ,handler_removeWatchLater 
         ,addVideoToLikedVideos,removeFromlikedVideos,handler_addVideoHistory} from '../../Service/service';
//component
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import SliderCard from '../../Component/SliderCard/SliderCard';
import { Playlist_Modal ,Auth_Modal,AddNote_Modal,ShareModal} from '../../Component/Modal/Modal';
//
import VideoContext from 'web-app/Context/video/VideoContext';
import { useAuth } from 'web-app/Context/login/AuthContext';
import Frame from 'web-app/Component/Frame/Frame';
//
const SinglePage =()=>{ 
    let {addwatchlist,removedwatchlist,watchlist,add_liked,removed_liked,liked,add_history,episode_video_Id} = useContext(VideoContext)
    let {token} = useAuth()
    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    const [isaddnote,setnote]=useState(false)
    const [isshare,setshare]=useState(false)

    const {id} = useParams();
    const [data,setdata]=useState();
    const [alldata,setalldata]=useState([]);
    const [showdata,setshowdata]=useState([]);


    
    useEffect(()=>{
        fetchAllVideoData().then(function(result){
             setalldata(result)

             let filterdata =  result.filter(item=> item.categoryName === "Shows")
             if(filterdata.length>0){
                let obj={}
                let newarr=[]
                for(let temp in filterdata){
                    if(obj[filterdata[temp].title]){
                      obj[filterdata[temp].title] = 1 + 1 ;
                    }else{
                      obj[filterdata[temp].title] = 1 ;
                      newarr.push(filterdata[temp])
                    }
                  }
                  setshowdata(newarr)
             }
         });
    },[])

    useEffect(()=>{
            let time2 = setTimeout(()=>{
                fetch_single_video(id).then((res)=>{
                setdata(res)
             })
            },0)
            return ()=>clearTimeout(time2)
    },[data,setdata])
    
 return(
     <div>
         <Header/>
         <div className='singlepage-container'> 
            {
                data!==undefined ? 
                  <> 
                    <section className='singlepage-display'>
                    <div className='flex-col singlepage-iframe'>
                        <Frame data={data} />
                        <div className='singlepage-opration singlepage-opration-content typography-padding-top-right-bottom-left'>
                                <span className='flex-row col-gap-1rem --background'> 
                                    <label className='--background'> Watch {data.categoryName} </label>
                                    <Link to={`/videolist/${data._id}/watch`} className="fa-solid fa-play" 
                                    onClick={()=>token?handler_addVideoHistory(token,data,add_history):""}></Link>
                                </span>
                                <div className='flex-row --background col-gap-2rem'>
                                        {
                                            token ? watchlist.length>0 && watchlist.find(item=>item._id === data._id)?
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i style={{color:'green'}} className="fa-solid fa-circle-check --background" onClick={()=>handler_removeWatchLater(token, removedwatchlist, data._id)}></i>
                                                <label className='--background --background'> watchlist </label>
                                            </span> :
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i className="fa-solid fa-plus --background" onClick={()=>handler_addWatchLater(token, addwatchlist, data)}></i>
                                                <label className='--background'>watchlist</label>
                                            </span> :
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i className="fa-solid fa-plus --background" onClick={()=>{setmodal(!ismodal)}}></i>
                                                <label className='--background'>watchlist</label>
                                            </span>
                                        }
                                        

                                        <span className='flex-col row-gap-0.5rem --background'>
                                            <i className="fa-solid fa-circle-plus --background" onClick={()=>setpaylist(!ispalylistmodal)}></i>
                                            <label className='--background'>playlist</label>
                                        </span>
                                        <span className='flex-col row-gap-0.5rem --background'>
                                            <i className="fa-solid fa-share-nodes --background"></i>
                                            <label className='--background' onClick={()=>setshare(!isshare)}>share</label>
                                        </span>
                                </div>
                      
                </div>
                            <div className='singlepage-content --background'>
                                <label className='singlepage-opration --background'> Title : {data.title} </label>
                                <label className='singlepage-opration --background'> Description: </label> 
                                <p className='singlepage-opration --background'> {data.description} </p>
                                <div className='flex-row col-gap-1rem --background typography-padding-top-right-bottom-left'> 
                                    {
                                        data.cast.length>0 ?
                                        data.cast.map((item,index)=>{
                                            return (
                                                <div className='cast-content --background' key={index}>
                                                   <img className='img-small-round --background' src={item.img}/>
                                                    <span> {item.name} </span> <span>as</span> <span> {item.role} </span>
                                                </div>
                                            )
                                        }) : null
                                    }
                            </div>
                            </div>
                            {
                                data.categoryName === "Shows" ? 
                                <div className='slider-container --background'>
                                <h4 className='slider-label --background'> All Episodes </h4> 
                                </div>
                                : null
                            }
                            
                            {
                              data.categoryName === "Shows" ? 
                                    <div className='horizontal-slider --background'> 
                                        <SliderCard type="show" cardlist={alldata.length>0 ? alldata.filter((item)=>item.title === data.title) : []}/>  
                                    </div>                                 
                                : null
                            }
                           
                        </div>
                         
                        {
                           data.categoryName === "Shows" ? 
                           <div className='horizontal-slider'> 
                           <SliderCard cardlist={showdata.length>0 ? showdata : []}/>  
                        </div> :
                         <div className='horizontal-slider'> 
                         <SliderCard cardlist={alldata.length>0 ? alldata.filter((item)=>item.categoryName === data.categoryName) : []}/>  
                      </div>
                        } 
                         
                    </section>
                  
                </>
                : null
            }
             
         </div>

         {ispalylistmodal?
                <Playlist_Modal videoid={data._id} data={data} modalClose={()=>setpaylist(false)} /> : null }
         {
             ismodal ? <Auth_Modal modalClose={()=>setmodal(false)} /> :null
         }

         {
             isaddnote? <AddNote_Modal videoid={data._id} data={data} modalClose={()=>setnote(false)} /> : null
         }
          {
             isshare ? <ShareModal data={data} modalClose={()=>setshare(false)}/> : null
         }

         <Footer/>
     </div>
 )
}
export default SinglePage; 
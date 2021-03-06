import '../SinglePage/SinglePage.css';
import '../Home/Home.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState ,useContext} from 'react';
//service
import { fetch_single_video,fetchAllVideoData} from '../../Service/service';
//component
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import SliderCard from '../../Component/SliderCard/SliderCard';
import { Playlist_Modal ,Auth_Modal,AddNote_Modal,ShareModal} from '../../Component/Modal/Modal';
//
import VideoContext from 'web-app/Context/video/VideoContext';
//
import DisplayNote from 'web-app/Component/AddNote/DisplayNote';
//redux
import { addLikedData ,removeLikedData } from '../../Redux/Reducer/likeSlice';
import { addWatchlistData , removeWatchlistData } from '../../Redux/Reducer/watchSlice';

import { useDispatch, useSelector } from "react-redux";

const PlayVideo =()=>{ 
    let { viewcount,toastdispatch} = useContext(VideoContext)
    //viewcount
    //let {token} = useAuth()
    const [ispalylistmodal,setpaylist]=useState(false)
    const [ismodal,setmodal]=useState(false)
    const [isaddnote,setnote]=useState(false)
    const [openNoteSidebar,SetopenNoteSidebar] = useState(false)

    //redux
    const { likedlist } = useSelector((store) => store.likes);
    const { watchlist } = useSelector((store) => store.watch);
    const { uploadlist } = useSelector((store) => store.upload);
    const { token , user } = useSelector((store) => store.authentication);


    const dispatch = useDispatch();

    const {id} = useParams();
    const [data,setdata]=useState();
    const [alldata,setalldata]=useState([]);
    const [isshare,setshare]=useState(false)
    const [showdata,setshowdata]=useState([]);


    useEffect(()=>{
        fetchAllVideoData().then(function(result){
            let newdata =  uploadlist.length>0 ? [...result,...uploadlist]  : result 
            setalldata(newdata)
             let filterdata =  newdata.filter(item=> item.categoryName === "Shows")
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
                    let check = uploadlist.length>0 ? uploadlist.find((item)=>item._id===id) : false;
                    if(check){ 
                        setdata(check)
                    }else{
                        setdata(res)
                    }
             })
            },0)
            return ()=>clearTimeout(time2)
    },[data,setdata])
    

    const renderView=(id)=>{
        let getview = viewcount.length>0 && viewcount.filter((item)=>item._id===id)
        return(
            <div className='--background'> <i class="fa-solid fa-eye"></i> {getview[0].view} view </div>
        )
    }

 return(
     <div>
         <Header/>
         <div className='singlepage-container'> 
            {
                data!==undefined ? 
                  <> 
                    <section className='singlepage-display'>
                    <DisplayNote id={data._id} closeNote={()=>SetopenNoteSidebar(false)} sidemenu={openNoteSidebar}/>
                    <div className='flex-col singlepage-iframe'>

                             <iframe
                                    width="100%" 
                                    height="500px"
                                    src={`https://www.youtube.com/embed/${data.videoYTId}?autoplay=1`} 
                                    title="YouTube video player" frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                             </iframe> 

                                 <div className='flex-row --background col-gap-2rem typography-padding-top-right-bottom-left'>
                                       
                                        {renderView(data._id)}
                                       {
                                            token ? likedlist.length>0 && likedlist.find(item=>item._id === data._id)?
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i style={{color:'green'}} className="fa-solid fa-thumbs-up --background" 
                                                onClick={()=>dispatch(removeLikedData([data._id,toastdispatch]))}
                                                ></i>
                                                <label className='--background --background'> like </label>
                                            </span> :
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i className="fa-solid fa-thumbs-down --background" 
                                                onClick={()=>dispatch(addLikedData([data,toastdispatch]))} 
                                                ></i>
                                                <label className='--background'>unlike</label>
                                            </span> :
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i className="fa-solid fa-thumbs-up --background" onClick={()=>{setmodal(!ismodal)}}></i>
                                                <label className='--background'>like</label>
                                            </span>
                                        }

                                        {
                                            token ? watchlist.length>0 && watchlist.find(item=>item._id === data._id)?
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i style={{color:'green'}} className="fa-solid fa-circle-check --background" 
                                                onClick={()=>dispatch(removeWatchlistData([data._id,toastdispatch]))}
                                                ></i>
                                                <label className='--background --background'> watchlist </label>
                                            </span> :
                                            <span className='flex-col row-gap-0.5rem --background'>
                                                <i className="fa-solid fa-plus --background" 
                                                onClick={()=>dispatch(addWatchlistData([data,toastdispatch]))}
                                                ></i>
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
                                            <i className="fa-solid fa-share-nodes --background" onClick={()=>setshare(!isshare)}></i>
                                            <label className='--background'>share</label>
                                        </span>
                                        
                                        <span className='flex-col row-gap-0.5rem --background'>
                                            <i className="fa-solid fa-note-sticky --background curser-pointer-noeffect" onClick={()=>SetopenNoteSidebar(!openNoteSidebar)}></i>
                                            <label className='--background'> add note </label>
                                        </span>

                                </div>

                            <div className='singlepage-content'>
                                <label> Title : {data.title} </label>
                                <label> Description: </label> 
                                <p> {data.description} </p>
                                <div className='flex-row col-gap-1rem'> 
                                    {
                                        data.cast.length>0 ?
                                        data.cast.map((item,index)=>{
                                            return (
                                                <div className='cast-content' key={index}>
                                                   <img className='img-small-round' src={item.img}/>
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

                        <div className='slider-container --background'>
                                <h4 className='slider-label --background'> More Like This </h4> 
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
export default PlayVideo; 
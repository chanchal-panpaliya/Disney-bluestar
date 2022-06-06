import { useEffect ,useState , useContext} from 'react';
import './History.css';
import Loader from 'web-app/Component/Loader/Loader';
import Header from 'web-app/Component/Header/Header';
import Footer from 'web-app/Component/Footer/Footer';
import liked_img from '../../img/images/temp/history.png';
import VideoContext from 'web-app/Context/video/VideoContext';
import { useNavigate } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from "react-redux";
import { getHistoryData ,DeleteHistoryData,DeleteAllHistoryData } from 'web-app/Redux/Reducer/historySlice';


const History=()=>{
  let navigator = useNavigate();
  let {toastdispatch} = useContext(VideoContext);

  const[data,setdata]=useState([])
  const [loader,setloader]=useState(false)
  //redux
  const { historylist } = useSelector((store) => store.history);
  const { token , user } = useSelector((store) => store.authentication);
  const dispatch = useDispatch();

  useEffect(()=>{
   let time = setTimeout(()=>{   
      dispatch(getHistoryData(token));
   },0)
     return () => clearTimeout(time)
  },[data])


  return(
    <div>
    <Header/>
        <div className='page-container-history'>
           <div className='page-data-display-history'>
                 <header className='like-page-header-history'>
                     <img className='like-page-round-circle-history' src={liked_img} />
                     <button className='playlist-addbutton' 
                    onClick={()=>dispatch(DeleteAllHistoryData([token,toastdispatch]))}> clear history </button>
                 </header>
                 <section className='like-page-body-history'> 
                      {
                          loader?<Loader/> : 
                          historylist.length>0?
                            <div className='like-page-card-grid-history'>
                               <ul class="flex-col list-style-type-none notification row-gap-1rem stack-padding">
                                {
                                    historylist.map((item,index)=>{
                                      return (
                                          <li class="Notification-card border-weight-left-primarycolor" key={index}> 
                                            <div class="Letter-avatar border-radius-round icon-primary-background-color">
                                              <span class="Letter-avatar-label"> 
                                                 {
                                                   item.categoryName==="Songs" && <i class="fa-solid fa-music avatar-icon-color-white"></i> 
                                                 }
                                                 {
                                                   item.categoryName==="Shows" && <i class="fa-solid fa-tv avatar-icon-color-white"></i> 
                                                 }
                                                 {
                                                   item.categoryName==="Movies" && <i class="fa-solid fa-film avatar-icon-color-white"></i> 
                                                 }
                                                 {
                                                   item.categoryName==="Sports" && <i class="fa-solid fa-cricket-bat-ball avatar-icon-color-white"></i> 
                                                 }{
                                                  item.categoryName==="Kids" && <i class="fa-brands fa-kickstarter avatar-icon-color-white"></i> 
                                                }
                                                
                                              </span>
                                            </div>
                                            <div class="flex-2 flex-align-item-center typography-p-small">
                                                  <div class="typography-h4 typography-fontweight-bold"> {item.title} </div>
                                                  <div class="typography-grey-text-extrasmall"> {item.categoryName} </div>
                                            </div>
                                            <img src={item.thumbnail.land} class="image-avatar-small" alt="image-avatar"/>
                                            <i class="material-icons notification-cancel-icon curser-pointer-noeffect" 
                                              onClick={()=>dispatch(DeleteHistoryData([item._id,toastdispatch]))}
                                               >close</i>
                                        </li>
                                    
                                      )
                                    })
                                }  
                                  </ul>                                    
                            </div>
                             
                            :
                            <div className='--background data-not-display flex-col row-gap-2rem flex-justify-content-center'> 
                            <label className='--background'> no data found </label>  
                            <button className='button header-button-login' onClick={()=>{navigator('/')}}> watch video </button>
                            </div>
                        }
                  </section>
           </div>
        </div>
       <Footer/>
    </div>
  )
}

export default History
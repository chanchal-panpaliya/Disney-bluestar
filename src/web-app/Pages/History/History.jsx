import { useEffect ,useState , useContext} from 'react';
import './History.css';
import { useAuth } from 'web-app/Context/login/AuthContext';
import { fetchAllHistoryData ,handler_removeHistory ,handler_removeallHistory } from 'web-app/Service/service';
import Loader from 'web-app/Component/Loader/Loader';
import Header from 'web-app/Component/Header/Header';
import Footer from 'web-app/Component/Footer/Footer';
import liked_img from '../../img/images/temp/history.png';
import VideoContext from 'web-app/Context/video/VideoContext';

const History=()=>{
  let {remove_history,removed_all_historys} = useContext(VideoContext);
  let {token} = useAuth()
  const[data,setdata]=useState([])
  const [loader,setloader]=useState(false)

  useEffect(()=>{
   let time = setTimeout(()=>{
       fetchAllHistoryData(token).then((res)=>{
          setdata(res.data.history)
        })  
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
                     <button className='playlist-addbutton' onClick={()=>handler_removeallHistory(token,removed_all_historys)}> clear history </button>
                 </header>
                 <section className='like-page-body-history'> 
                      {
                          loader?<Loader/> : 
                            data.length>0?
                            <div className='like-page-card-grid-history'>
                               <ul class="flex-col list-style-type-none notification row-gap-1rem stack-padding">
                                {
                                    data.map((item,index)=>{
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
                                               onClick={()=>handler_removeHistory(token, remove_history,item._id)}>close</i>
                                        </li>
                                    
                                      )
                                    })
                                }  
                                  </ul>                                    
                            </div>
                             
                            :
                            <div> no data found </div>
                        }
                  </section>
           </div>
        </div>
       <Footer/>
    </div>
  )
}

export default History
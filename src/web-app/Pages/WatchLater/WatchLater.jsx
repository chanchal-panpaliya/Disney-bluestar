import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './WatchLater.css';
import { useAuth } from 'web-app/Context/login/AuthContext';
import { fetchAllWatchlaterData } from 'web-app/Service/service';
import Loader from 'web-app/Component/Loader/Loader';
import { VideoListCard } from 'web-app/Component/Card/Card';
import Footer from 'web-app/Component/Footer/Footer';
import Header from 'web-app/Component/Header/Header';
//img
import liked_img from '../../img/images/temp/watchlater.png'

const WatchLater=()=>{
  let navigator = useNavigate()
  let {token} = useAuth()
  const[data,setdata]=useState([])

  useEffect(()=>{
   let time = setTimeout(()=>{
        fetchAllWatchlaterData(token).then((res)=>{
          setdata(res.data.watchlater)
        })    
   },0)
     return () => clearTimeout(time)
  },[data])

  return(
    <div>
    <Header/>
        <div className='page-container-watchlist'>
           <div className='page-data-display-watchlist'>
               <header className='like-page-header-watchlist'>
                   <img className='like-page-round-circle-watchlist' src={liked_img} />
               </header>
               <section className='like-page-body-watchlist'>
               {
                  data.length>0? 
                  <div className='like-page-card-grid-watchlist'> 
                        {data.map((item,index)=>{
                            return <VideoListCard data={item} />
                        }) }
                  </div>
                  :
                  <div className='--background flex-col row-gap-2rem'> 
                  <div> no data found </div> 
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

export default WatchLater
import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './WatchLater.css';
import { VideoListCard } from 'web-app/Component/Card/Card';
import Footer from 'web-app/Component/Footer/Footer';
import Header from 'web-app/Component/Header/Header';
//img
import liked_img from '../../img/images/temp/watchlater.png'
//redux
import { useDispatch, useSelector } from "react-redux";
import { getWatchlistData } from '../../Redux/Reducer/watchSlice';

const WatchLater=()=>{
  let navigator = useNavigate()
  const[data,setdata]=useState([])
  //redux
  const { watchlist } = useSelector((store) => store.watch);
  const { token , user } = useSelector((store) => store.authentication);
  const dispatch = useDispatch();

  useEffect(()=>{
   let time = setTimeout(()=>{   
        dispatch(getWatchlistData(token)) 
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
                  watchlist.length>0? 
                  <div className='like-page-card-grid-watchlist'> 
                        {watchlist.map((item,index)=>{
                            return <VideoListCard data={item} />
                        }) }
                  </div>
                  :
                  <div className='--background data-not-display flex-col row-gap-2rem flex-justify-content-center'> 
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
import { useEffect ,useState} from 'react';
import { useAuth } from 'web-app/Context/login/AuthContext';
import { fetchAllLikedData } from 'web-app/Service/service';
import Loader from 'web-app/Component/Loader/Loader';
import { VideoListCard } from 'web-app/Component/Card/Card';
import { useNavigate } from 'react-router-dom';
import './Liked.css';
import Footer from 'web-app/Component/Footer/Footer';
import Header from 'web-app/Component/Header/Header';
//img
import liked_img from '../../img/images/temp/like.png'
//
import {CardHome} from 'web-app/Component/Card/CardHome';

const Liked = () =>{
  let navigator = useNavigate();
  let {token} = useAuth()
  const[data,setdata]=useState([])
  useEffect(()=>{
   let time = setTimeout(()=>{
        fetchAllLikedData(token).then((res)=>{
          setdata(res.data.likes)
        })    
   },0)
     return () => clearTimeout(time)
  },[data,setdata])

   return(
    <div>
    <Header/>
        <div className='page-container'>
           <div className='page-data-display'>
               <header className='like-page-header'>
                   <img className='like-page-round-circle' src={liked_img} />
               </header>
               <section className='like-page-body'>
               {
                  data.length>0? 
                  <div className='like-page-card-grid'> 
                        {data.map((item,index)=>{
                        return  <CardHome data={item}/>  
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
export default Liked


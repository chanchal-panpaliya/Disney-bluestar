import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Liked.css';
import Footer from 'web-app/Component/Footer/Footer';
import Header from 'web-app/Component/Header/Header';
//img
import liked_img from '../../img/images/temp/like.png'
//
import {CardHome} from 'web-app/Component/Card/CardHome';

//redux
import { useDispatch, useSelector } from "react-redux";
import { getLikedData } from '../../Redux/Reducer/likeSlice';


const Liked = () =>{
  let navigator = useNavigate();
  const[data,setdata]=useState([])
  //redux
  const { likedlist } = useSelector((store) => store.likes);
  const { token , user } = useSelector((store) => store.authentication);
  const dispatch = useDispatch();

  useEffect(()=>{
   let time = setTimeout(()=>{
        dispatch(getLikedData(token))    
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
                  likedlist.length>0? 
                  <div className='like-page-card-grid'> 
                        {likedlist.map((item,index)=>{
                        return  <CardHome data={item}/>  
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
export default Liked


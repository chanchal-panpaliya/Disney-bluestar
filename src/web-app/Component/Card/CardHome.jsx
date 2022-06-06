import './index.css';
import { useEffect, useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
import VideoContext from 'web-app/Context/video/VideoContext';
import { Auth_Modal } from '../Modal/Modal';
//redux
import { addLikedData ,removeLikedData } from '../../Redux/Reducer/likeSlice';
import { useDispatch, useSelector } from "react-redux";

const CardHome=({data})=>{
    let {toastdispatch} = useContext(VideoContext)
    const [ismodal,setmodal]=useState(false)
    //redux
    const { likedlist } = useSelector((store) => store.likes);
    const { token , user } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();
    return(
        <>
         <div className="card">
        <Link to={"/videolist/"+data._id} onClick={()=>{window.scrollTo({ behavior: 'smooth', top: '0px' });}}> 
            <img src={data.thumbnail.land} className="card-img" alt=""/>
        </Link>
        <div className="card-body">
            {
                token ? likedlist.length>0 && likedlist.find(item=>item._id === data._id)?
                <span className='flex-col row-gap-0.5rem --background watchlist-btn'>
                    <i style={{color:'green'}} className="fa-solid fa-thumbs-up --background" 
                    onClick={()=>dispatch(removeLikedData([data._id,toastdispatch]))}
                    ></i>
                </span> :
                <span className='flex-col row-gap-0.5rem --background watchlist-btn'>
                    <i className="fa-solid fa-thumbs-down --background"  
                    onClick={()=>dispatch(addLikedData([data,toastdispatch]))}
                    ></i>
                </span> :
                <span className='flex-col row-gap-0.5rem --background watchlist-btn'>
                    <i className="fa-solid fa-thumbs-up --background" onClick={()=>{setmodal(!ismodal)}}></i>
                </span>                           
            }
        </div>
        <span>{data.uploadedOn}</span>
    </div>
    {
        ismodal ? <Auth_Modal modalClose={()=>setmodal(false)} /> :null
    }
        </>
   
    )
}

const CardPlaylsitContainer=({data})=>{
    return(
    <div className="card">
        <Link to={"/videolist/"+data._id} onClick={()=>{window.scrollTo({ behavior: 'smooth', top: '0px' });}}> 
            <img src={data.thumbnail.land} className="card-img" alt=""/>
        </Link>
        <div className="card-body">
            <button className="watchlist-btn">add to watchlist</button>
            <button className="watchlist-btn">watch</button>
        </div>
        <span>{data.uploadedOn}</span>
    </div>
    )
}


const CardContinueWatch=({data})=>{
    return(
        <>
         <div className="card temp-card">
            <Link to={"/videolist/"+data._id} onClick={()=>{window.scrollTo({ behavior: 'smooth', top: '0px' });}}> 
                <img src={data.thumbnail.land} className="card-img" alt=""/>
            </Link>
            <div className="card-body">
               
            </div>
        </div>
        </>
    )
}

export {CardHome,CardPlaylsitContainer,CardContinueWatch}
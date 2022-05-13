import './index.css';
import { useEffect, useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
import VideoContext from 'web-app/Context/video/VideoContext';
import { useAuth } from 'web-app/Context/login/AuthContext';
import {addVideoToLikedVideos,removeFromlikedVideos} from 'web-app/Service/service';
import { Auth_Modal } from '../Modal/Modal';


const CardHome=({data})=>{
    let {add_liked,removed_liked,liked} = useContext(VideoContext)
    let {token} = useAuth()
    const [ismodal,setmodal]=useState(false)

    return(
        <>
         <div className="card">
        <Link to={"/videolist/"+data._id} > 
            <img src={data.thumbnail.land} className="card-img" alt=""/>
        </Link>
        <div className="card-body">
            {
                token ? liked.length>0 && liked.find(item=>item._id === data._id)?
                <span className='flex-col row-gap-0.5rem --background watchlist-btn'>
                    <i style={{color:'green'}} className="fa-solid fa-thumbs-up --background" onClick={()=>removeFromlikedVideos(token, removed_liked, data._id)}></i>
                </span> :
                <span className='flex-col row-gap-0.5rem --background watchlist-btn'>
                    <i className="fa-solid fa-thumbs-down --background"  onClick={()=>addVideoToLikedVideos(token, add_liked, data)}></i>
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
        <Link to={"/videolist/"+data._id} > 
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

export {CardHome,CardPlaylsitContainer}
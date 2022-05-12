//react
import { useEffect, useRef, useState } from 'react';
//component
import  {VideoCard,EpisodeVideoListCard}  from '../Card/Card';
import Loader from '../Loader/Loader';
//css
import './SliderCard.css';


const SliderCard =(props) =>{
    let [scrollcard,setscrollcard]=useState(0);
    const containerRef = useRef();

    const handlescrollcardLeft =()=>{
      containerRef.current.scrollLeft -= 500;
    }

    const handlescrollcardRight =()=>{
      containerRef.current.scrollLeft += 500;
  }

    return(
        <div className="main-slider-container">
        <button className="slider-icon left" onClick={handlescrollcardLeft}> <i class="fa-solid fa-arrow-left"></i> </button>
        <div className="slider" style={{scrollLeft:scrollcard}} ref={containerRef}>
           {
           props.cardlist.length>0? 
            props.cardlist.map((slide,index)=>{
                    return(
                      props.type === "show" ? 
                      slide !== null ? 
                      <EpisodeVideoListCard data={slide} key={index} Loader={""}/> 
                    : <EpisodeVideoListCard data={[]} Loader={"Loader"} key={index}/>  :
                      slide !== null ? 
                        <VideoCard data={slide} key={index} Loader={""}/> 
                      : <VideoCard data={[]} Loader={"Loader"} key={index}/>  
                    )
                })
            : <div> <Loader/> </div>
            }
        </div>
        <button className="slider-icon right" onClick={handlescrollcardRight}> <i class="fa-solid fa-arrow-right"></i> </button>
    </div>  
    )

}

export default SliderCard;
//react
import { useEffect, useRef, useState } from 'react';
//component
import  {Vertical_Slider_Card}  from '../Card/Card';
import Loader from '../Loader/Loader';
//css
import './SliderCard-V.css';
//img

const SliderCard_Vertical =(props) =>{
     let [scrollcard,setscrollcard]=useState(0);
    const containerRef = useRef();

    const handlescrollcardLeft =()=>{
      containerRef.current.scrollTop -= 500;
    }

    const handlescrollcardRight =()=>{
      containerRef.current.scrollTop += 500;
  }

    return(
        <div className="V-main-slider-container">
        <button className="V-slider-icon left" onClick={handlescrollcardLeft}> <i class="fa fa-angle-double-down"></i> </button>
        <div className="V-slider" style={{scrollTop:scrollcard}} ref={containerRef}>
           {
           props.cardlist.length>0? 
            props.cardlist.map((slide,index)=>{
                    return(
                      slide !== null ? 
                        <Vertical_Slider_Card data={slide} key={index} Loader={""}/> 
                      : <Vertical_Slider_Card data={[]} Loader={"Loader"} key={index}/>  
                    )
                })
            : <div> <Loader/> </div>
            }
        </div>
        <button className="V-slider-icon right" onClick={handlescrollcardRight}> <i class="fa fa-angle-double-up"></i> </button>
    </div>  
    )

}

export default SliderCard_Vertical;
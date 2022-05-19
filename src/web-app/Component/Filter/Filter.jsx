import { useEffect,useState,useContext,useRef} from 'react';
import './Filter.css';
import VideoContext from 'web-app/Context/video/VideoContext';

const Filter=({data})=>{
  let {filter,filter_dispatch} = useContext(VideoContext);

  const [checklist , setChecklist ] = useState([])
  const [selectedsort,setselectedsort]=useState("")

  let [scrollcard,setscrollcard]=useState(0);
  const containerRef = useRef();

  const handlescrollcardLeft =()=>{
    containerRef.current.scrollLeft -= 500;
  }

  const handlescrollcardRight =()=>{
    containerRef.current.scrollLeft += 500;
}



  useEffect(()=>{  
    let time1 = setTimeout(()=>{
       let unique_list = data.length>0 && [...new Set(data.map(q => q.categoryType))];
       let updated_list = unique_list.length>0 && unique_list.filter((item)=>item!=="")
         if(unique_list[0]!==""){
          setChecklist(updated_list) 
         }
    },0)
  return ()=> clearTimeout(time1)  
})

const render_sort=(data)=>{
  return(
    <div> 
      <label> sort by </label>
       <select className='filter-select' value={selectedsort} onChange={(e)=>{setselectedsort(e.target.value); filter_dispatch({type:"SORT",payload:e.target.value})}}>
          <option value="clear"> clear </option>
          <option value="asc-by-title"> asc-by-title </option>
          <option value="dec-by-title"> dec-by-title </option>
          <option value="asc-by-date"> asc-by-date </option>
          <option value="dec-by-date"> dec-by-date </option>
       </select>
    </div>
  )
}

const render_categoryType=(data)=>{
 return (<div className='categorytype-conatiner --background'> 
         <button className={filter.categoryType==="All"?"badge-onselect":"badge-not"}  onClick={()=>{filter_dispatch({type:"CATEGORY_TYPE",payload:"All"})}}> All </button>
          {
            checklist.length>0 && checklist.map((item,index)=>{
               return <>
               <button className={filter.categoryType===item?"badge-onselect":"badge-not"}  key={index} onClick={()=>{filter_dispatch({type:"CATEGORY_TYPE",payload:item})}}> {item} </button>
               </>
            })
          }
 </div>)
}


// const render_categoryType=(data)=>{
//    return (
//     <div className="main-slider-container">
//     <button style={{display:'none'}} className="slider-icon left" onClick={handlescrollcardLeft}> <i class="fa-solid fa-arrow-left"></i> </button>
//     <div className="slider --background" style={{scrollLeft:scrollcard,background:"none"}} ref={containerRef}>
//     <button className={filter.categoryType==="All"?"badge-onselect":"badge-not"}  onClick={()=>{filter_dispatch({type:"CATEGORY_TYPE",payload:"All"})}}> All </button>
//        {
//          checklist.length>0 && checklist.map((item,index)=>{
//           return <>
//           <button className={filter.categoryType===item?"badge-onselect":"badge-not"}  key={index} onClick={()=>{filter_dispatch({type:"CATEGORY_TYPE",payload:item})}}> {item} </button>
//           </>
//        })
//         }
//     </div>
//     <button  style={{display:'none'}} className="slider-icon right" onClick={handlescrollcardRight}> <i class="fa-solid fa-arrow-right"></i> </button>
// </div>
//    )
//   }

  return(
      <div className='filter-conatiner --background'>
           {render_categoryType(data)}
           {render_sort(data)} 
      </div>
  )
}
export default Filter
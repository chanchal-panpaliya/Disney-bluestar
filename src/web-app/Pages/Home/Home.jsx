//react
import { useEffect,useState,useContext} from "react";
//css
import './Home.css';
//component
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import Slider from "../../Component/Slider/Slider";
import { fetchAllVideoData ,fetch_Show_Data ,fetch_movie_Data} from "../../Service/service";
import SliderCard from "../../Component/SliderCard/SliderCard";

import sliderdata from '../../Component/Slider/dataSlider';
//
import loder_img from '../../img/images/temp/css-swing-masking-loader.gif';
//
import VideoContext from "web-app/Context/video/VideoContext";


const Home = ()=>{
  let{Continuewatchlist,uploadedvideo} = useContext(VideoContext)
  const [data,setdata]=useState([]);
  const [loader,setloader]=useState(false)
  const [movie,setmovie]=useState([]);
  const [show,setshow]=useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      setLoading((loading) => !loading);
    };
    loadData();
  }, [])


  useEffect(()=>{
    window.scrollTo({ behavior: 'smooth', top: '0px' });
    setloader(true)
   fetchAllVideoData().then(function(result){
    let newdata =  uploadedvideo.length>0 ? [...result,...uploadedvideo]  : result 
      setdata(newdata)   
      setloader(false)    
   });

   fetch_movie_Data().then(function(result){
    let newdata =  uploadedvideo.length>0 ? [...result,...uploadedvideo]  : result
    let filterdata =  newdata.filter(item=> item.categoryName === "Movies")
     setmovie(filterdata)
   });

   fetch_Show_Data().then(res=>{
    let newdata =  uploadedvideo.length>0 ? [...res,...uploadedvideo]  : res
    let filterdata =  newdata.filter(item=> item.categoryName === "Shows")
    setshow(filterdata)
   })

  },[])

  if (loading) {
    return <div><img src={loder_img} className="loader-img"/></div>
}else{
  return(
      <div>
           <Header/>
           <Slider sliderdata={sliderdata.length>0?sliderdata.filter((item)=>item.type==="home"):[]}/>

           {
             Continuewatchlist.length>0 ?
              <div className="slider-container">
                <label className="slider-label"> Continue watch </label>
                <SliderCard type="continuewatch" cardlist={Continuewatchlist.length>0?Continuewatchlist:[]}/>
              </div>
             : null
           }

           <div className="slider-container">
             <label className="slider-label"> Movies </label>
             <SliderCard cardlist={movie.length>0?movie:[]}/>
           </div>
           <div className="slider-container">
             <label className="slider-label"> Ramayan </label>
             <SliderCard type="show" cardlist={show.length>0?show.filter((item)=>item.title === "Ramayan (1987–1988)"):[]}/>
           </div>
           <div className="slider-container">
             <label className="slider-label"> Geeta </label>
             <SliderCard type="show" cardlist={show.length>0?show.filter((item)=>item.title === "Geeta Updesh"):[]}/>
           </div>
           <Footer/> 
      </div>
  )
}
}
export default Home;
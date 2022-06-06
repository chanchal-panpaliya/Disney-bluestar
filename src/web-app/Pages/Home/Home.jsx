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
//redux
import { useSelector } from "react-redux";


const Home = ()=>{
  let{Continuewatchlist} = useContext(VideoContext)
  const [data,setdata]=useState([]);
  const [loader,setloader]=useState(false)
  const [movie,setmovie]=useState([]);
  const [show,setshow]=useState([]);
  const [loading, setLoading] = useState(true);
  const [Allshowdata,setAllshowdata]=useState([]);
  //redux
  const { uploadlist } = useSelector((store) => store.upload);

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
    let newdata =  uploadlist.length>0 ? [...result,...uploadlist]  : result 
      setdata(newdata)   
      setloader(false)    
   });

   fetch_movie_Data().then(function(result){
    let newdata =  uploadlist.length>0 ? [...result,...uploadlist]  : result
    let filterdata =  newdata.filter(item=> item.categoryName === "Movies")
     setmovie(filterdata)
   });

   fetch_Show_Data().then(res=>{
    let newdata =  uploadlist.length>0 ? [...res,...uploadlist]  : res
    let filterdata =  newdata.filter(item=> item.categoryName === "Shows")
    setshow(filterdata)
   })

   fetchAllVideoData().then(function(result){
    let newdata =  uploadlist.length>0 ? [...result,...uploadlist]  : result 
     let filterdata =  newdata.filter(item=> item.categoryName === "Shows")
     if(filterdata.length>0){
        let obj={}
        let newarr=[]
        for(let temp in filterdata){
            if(obj[filterdata[temp].title]){
              obj[filterdata[temp].title] = 1 + 1 ;
            }else{
              obj[filterdata[temp].title] = 1 ;
              newarr.push(filterdata[temp])
            }
          }
          setAllshowdata(newarr)
     }
 });

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
           <div className="slider-container">
             <label className="slider-label"> All Shows </label>
             <SliderCard cardlist={Allshowdata.length>0?Allshowdata:[]}/>
           </div>
           <div className="slider-container">
             <label className="slider-label"> Songs </label>
             <SliderCard type="show" cardlist={data.length>0?data.filter((item)=>item.categoryName === "Songs"):[]}/>
           </div>
           <div className="slider-container">
             <label className="slider-label"> Sports </label>
             <SliderCard type="show" cardlist={data.length>0?data.filter((item)=>item.categoryName === "Sports"):[]}/>
           </div>
           <div className="slider-container">
             <label className="slider-label"> Kids </label>
             <SliderCard type="show" cardlist={data.length>0?data.filter((item)=>item.categoryName === "Kids"):[]}/>
           </div>
           <div className="slider-container">
             <label className="slider-label"> Korean Drama : Boys Over Flowers </label>
             <SliderCard type="show" cardlist={show.length>0?show.filter((item)=>item.title === "Boys Over Flowers"):[]}/>
           </div>
           <div className="slider-container">
             <label className="slider-label"> Tu Tu Main Main </label>
             <SliderCard type="show" cardlist={show.length>0?show.filter((item)=>item.title === "Tu Tu Main Main"):[]}/>
           </div>
           <div className="slider-container">
             <label className="slider-label"> English : Small Wonder </label>
             <SliderCard type="show" cardlist={show.length>0?show.filter((item)=>item.title === "Small Wonder"):[]}/>
           </div>
           <div className="slider-container">
             <label className="slider-label"> Super Hero : Shaktiman </label>
             <SliderCard type="show" cardlist={show.length>0?show.filter((item)=>item.title === "Shaktiman"):[]}/>
           </div>
           <Footer/> 
      </div>
  )
}
}
export default Home;
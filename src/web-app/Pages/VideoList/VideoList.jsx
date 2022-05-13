import {useEffect,useState,useContext} from "react";
//css
import './VideoList.css';
import '../Playlist/PlayList.css';
//service
import { fetchAllVideoData } from "../../Service/service";
//component
import { VideoListCard } from '../../Component/Card/Card';
import Filter from "../../Component/Filter/Filter";
import Loader from "../../Component/Loader/Loader";
//context
import VideoContext from "../../Context/video/VideoContext";
import Footer from "web-app/Component/Footer/Footer";
import Header from "web-app/Component/Header/Header";
//filter reducer
import {get_Category_Type,get_SORT_DATA} from "../../Component/Filter/FilterUtility";
import Slider from "web-app/Component/Slider/Slider";
import sliderdata from '../../Component/Slider/dataSlider';

import loder_img from '../../img/images/temp/css-swing-masking-loader.gif';

const VideoList =()=>{
  let {selectedMenu,filter,filter_dispatch} = useContext(VideoContext)
  const [data,setdata]=useState([]);
  const [loader,setloader]=useState(false)
  const [loading, setLoading] = useState(true);

  
  selectedMenu = localStorage.getItem('VIDEO_MENU_SELECTED');

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      setLoading((loading) => !loading);
    };
    loadData();
  }, [])

  useEffect(()=>{
    setloader(true)
    fetchAllVideoData().then(function(result){      
      let filterdata =  result.filter(item=> item.categoryName === selectedMenu)
      let obj={}
      let newarr=[]
      if(selectedMenu==="Shows"){
          for(let temp in filterdata){
            if(obj[filterdata[temp].title]){
              obj[filterdata[temp].title] = 1 + 1 ;
            }else{
              obj[filterdata[temp].title] = 1 ;
              newarr.push(filterdata[temp])
            }
          }
          setdata(newarr)
      }else{
        setdata(filterdata)
      }
      setloader(false)      
   });
  },[selectedMenu])



  const category_Type = get_Category_Type(data,filter.categoryType);
  const sort_Data = get_SORT_DATA(category_Type,filter.sort)
 
  
  if (loading) {
    return <div><img src={loder_img} className="loader-img"/></div>
}else{
  return(
    <div>
    <Header/>
    <Slider sliderdata={sliderdata.length>0?sliderdata.filter((item)=>item.type===selectedMenu):[]} />
        <div className='page-container-videolist --background'>
           <div className='page-data-display-videolist --background'>
             <Filter data={data.length>0 ? data : []} />
          {/* VideoList */}
          <div className="videolist-display --background">
              {
                loader? <Loader/> : sort_Data.length>0?
                sort_Data.map((item,index)=>{
                    return <VideoListCard data={item} key={index} Loader={""}/>
                  })
                :
                <div> no data found </div>
              }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
 }
}
export default VideoList 
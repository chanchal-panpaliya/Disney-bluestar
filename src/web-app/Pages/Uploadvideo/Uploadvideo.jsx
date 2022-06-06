import './Uploadvideo.css';
import {useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoListCard } from 'web-app/Component/Card/Card';
import Footer from 'web-app/Component/Footer/Footer';
import Header from 'web-app/Component/Header/Header';
import {UploadvideoModal} from '../../Component/Modal/Modal';
import VideoContext from 'web-app/Context/video/VideoContext';
//img
import uploadicon from '../../img/images/temp/uploadicon.png'
//
import { useDispatch, useSelector } from "react-redux";

const Uploadvideo =()=>{
    const[data,setdata]=useState([])
    const [isuploadmodal,setuploadmodal] = useState(false)
    // redux
    const dispatch = useDispatch();
    const { uploadlist } = useSelector((store) => store.upload);
    const { token , user } = useSelector((store) => store.authentication);

    return(
      <div>
      <Header/>
          <div className='page-container-uploadvideo'>
             <div className='page-data-display-uploadvideo'>
                 <header className='like-page-header-uploadvideo'>
                     <img className='like-page-round-circle-uploadvideo' src={uploadicon} />
                     <button className='playlist-addbutton'onClick={()=>setuploadmodal(!isuploadmodal)}> Upload Video </button>
                 </header>
                 <section className='like-page-body-uploadvideo'>
                 {
                    uploadlist.length>0? 
                    <div className='like-page-card-grid-uploadvideo'> 
                          {uploadlist.map((item,index)=>{
                              return <VideoListCard data={item} />
                          }) }
                    </div>
                    :
                    <div className='--background data-not-display flex-col row-gap-2rem flex-justify-content-center'> 
                        <div> no data found </div> 
                    </div>
                }
                 </section>
            </div>
          </div>
          {
              isuploadmodal ? <UploadvideoModal modalClose={()=>setuploadmodal(false)}/>: null
          }
        <Footer/>
      </div>
    )
}

export default Uploadvideo
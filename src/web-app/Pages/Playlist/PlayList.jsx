import { useContext ,useEffect ,useState} from 'react';
import './PlayList.css';
//component
import Loader from "../../Component/Loader/Loader";
import { Playlist_Container_Card } from 'web-app/Component/Card/CardPlaylist';
import { Playlist_Modal } from '../../Component/Modal/Modal';
//context

import { useAuth } from 'web-app/Context/login/AuthContext';
import { fetchAllPlaylistData } from 'web-app/Service/service';
import Footer from 'web-app/Component/Footer/Footer';
import Header from 'web-app/Component/Header/Header';

//img
import liked_img from '../../img/images/temp/pngegg.png';

const Playlist = ({route}) =>{
    let {token} = useAuth()
    const [loader,setloader]=useState(false)
    const [playlistdata,setplaylistdata]=useState([])
    const [ispalylistmodal,setpaylist]=useState(false)

    useEffect(()=>{
      let time = setTimeout(()=>{
        fetchAllPlaylistData(token).then((res)=>{
          setplaylistdata(res.data.playlists)
        }) 
      },0)
      return ()=>clearTimeout(time)  

    },[playlistdata])

    return(
      <div>
      <Header/>
          <div className='page-container-palylist'>
             <div className='page-data-display-palylist'>
                 <header className='like-page-header-palylist'>
                     <img className='like-page-round-circle-palylist' src={liked_img} />
                     <button className='playlist-addbutton' onClick={()=>setpaylist(!ispalylistmodal)}> add playlist</button>
                 </header>
                 <section className='like-page-body-palylist'>
                 {
                   loader? <Loader/> : playlistdata.length>0? 
                    <div className='like-page-card-grid-palylist'> 
                          {playlistdata.map((item,index)=>{
                          return <Playlist_Container_Card data={item} route={route}/>
                          }) }
                    </div>
                    :
                    <div className='--background'> no data found </div>
                }
                 </section>
            </div>
          </div>
          {ispalylistmodal?
                <Playlist_Modal videoid={"addplaylist"} data={""} modalClose={()=>setpaylist(false)} /> : null }
        <Footer/>
      </div>
    )
}
export default Playlist
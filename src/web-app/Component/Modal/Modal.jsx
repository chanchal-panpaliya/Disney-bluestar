import "./Modal.css";
import Auth from "../../Pages/Auth/Auth";
import AddPlayList from "../../Pages/Playlist/addpalylist";
import AddNote from "../AddNote/AddNote";
import EditNote from "../AddNote/EditNote";
import SharePage from "../SharePage/SharePage";
import AddVideoForm from "web-app/Pages/Uploadvideo/AddVideoForm";
import { useSelector } from "react-redux";
//img
import playlist from '../../img/images/temp/playlist1.png';
export const Modal =({modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                    
                </div> 
            </div>
            <i className='material-icons modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const Auth_Modal =({modalClose,page})=>{
    return(
        <div className='modal modal-auth'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                      <Auth modalClose={modalClose} page={page}/>
                </div> 
            </div>
            <i className='modal-close' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const Playlist_Modal =({videoid,data,modalClose})=>{
    const { token , user } = useSelector((store) => store.authentication);
    if(token)
    return(
        <div className='modal'>
        <div className="modal-container">
            <div className='modal-left-side'>
                <h2 className="--background"> Create Playlist </h2>
                <img className='modal-left-side-img --background' src={playlist}/>
            </div>  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                     <AddPlayList videoId={videoid} data={data}/>      
                </div> 
            </div>
            <button className='modal-close-modal' onClick={modalClose}> <i class="fa-solid fa-xmark"></i> </button>
        </div>
    </div> 

    )
    else{
       return <Auth_Modal modalClose={modalClose}/>
    }
}

export const AddNote_Modal =({videoid,data,modalClose})=>{
    const { token , user } = useSelector((store) => store.authentication);
    if(token)
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                      <AddNote vidid={videoid} data={data} modalClose={modalClose}/>
                </div> 
            </div>
            <i className='modal-close-palylist' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
    else{
       return <Auth_Modal modalClose={modalClose}/>
    }
}

//note edit
export const AddEdit_Modal =({data,modalClose})=>{
    const { token , user } = useSelector((store) => store.authentication);
    if(token)
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row '>
                      <EditNote data={data} modalClose={modalClose}/>
                </div> 
            </div>
            <i className='modal-close-palylist' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
    else{
       return <Auth_Modal modalClose={modalClose}/>
    }
}

export const ShareModal =({data,modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                   <SharePage data={data}/>
                </div> 
            </div>
            <i className='modal-close-palylist --background' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}

export const UploadvideoModal =({modalClose})=>{
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                   <AddVideoForm modalClose={modalClose}/>
                </div> 
            </div>
            <i className='modal-close-palylist --background' onClick={modalClose}> x </i>
        </div>
    </div> 
    )
}


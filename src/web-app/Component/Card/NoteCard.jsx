//react
import { useContext ,useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
//css
import './Card.css';
//component
import {AddEdit_Modal} from '../Modal/Modal';
import VideoContext from 'web-app/Context/video/VideoContext';
import { useAuth } from 'web-app/Context/login/AuthContext';
import {deleteNoteService} from '../../Service/service';


export const NoteCard=({data,key})=>{
     let{toastdispatch} = useContext(VideoContext)
     let {token} = useAuth()
     const [iseditmodal,seteditmodal]=useState(false)
 
   return(
       <>
        <div className='note-card flex-col row-gap-1rem' key={key}>
           <label className='--background note-title'> Title :- {data.title} </label> 
           <div className='description' dangerouslySetInnerHTML={{__html:data.text}}></div>
           <div className='flex-row --background card-footer-icon'> 
                <button className='note-edit-button' onClick={()=>seteditmodal(!iseditmodal)}> edit </button>
                <button className='note-delete-button' onClick={()=>deleteNoteService( token, data._id ,toastdispatch)}> delete </button>
           </div>
        </div>
       {
         iseditmodal ? <AddEdit_Modal data={data} modalClose={()=>seteditmodal(false)}/> : null
       }
       </>
   )
}
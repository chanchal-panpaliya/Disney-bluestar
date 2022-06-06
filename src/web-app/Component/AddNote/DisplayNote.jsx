import './AddNote.css';
import { getNotesService } from 'web-app/Service/service';
import {useState,useEffect} from "react";
import { NoteCard } from '../Card/NoteCard';
import {Auth_Modal,AddNote_Modal} from '../../Component/Modal/Modal';
//redux
import { useDispatch, useSelector } from "react-redux";
import { getNoteData } from '../../Redux/Reducer/noteSlice';


const DisplayNote =({id,closeNote,sidemenu})=>{
    const [noteList,SetnoteList] = useState([]);
    const [isaddnote,setnote]=useState(false)
    const [ismodal,setmodal]=useState(false)
    //redux
    const { notelist } = useSelector((store) => store.note);
    const { token , user } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();

    useEffect(()=>{
        let time2 = setTimeout(()=>{
            dispatch(getNoteData([token,id]))
        },0)
        return ()=>clearTimeout(time2)
    },[noteList,SetnoteList])    

return(
    <> 
    <div>
        <nav className={sidemenu ? "nav-menu-note active" : "nav-menu-note"}>
            <ul className="nav-menu-items-note">
                    <li className="navbar-toggle-note">
                        <i className="fa-solid fa-xmark note-icon-close" onClick={closeNote}>  </i>
                    </li>
                    <h2> NOTE </h2>  
                    <div className='typology-padding-top'>
                        {
                            token ?
                            <button className='header-button-login' onClick={()=>setnote(!isaddnote)}> Add Note </button>
                            :
                            <button className='header-button-login' onClick={()=>{setmodal(!ismodal)}}> Add Note </button>  
                        }
                    </div> 
                    <div className='padding-1rem flex-col row-gap-2rem'>
                               {
                                    notelist.length>0 && notelist.map((item,index)=>{
                                        return  <NoteCard data={item} key={index}/>
                                    })
                                }
                    </div>            
            </ul>
    </nav>
    </div>
        {
             isaddnote? <AddNote_Modal videoid={id}  modalClose={()=>setnote(false)} /> : null
         }
          {
             ismodal ? <Auth_Modal modalClose={()=>setmodal(false)} /> :null
         }
    </>
 )
}

export default DisplayNote
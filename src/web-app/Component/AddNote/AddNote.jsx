import { useState,useContext } from 'react';
import './AddNote.css';
import {addNoteService} from 'web-app/Service/service';
import { useAuth } from 'web-app/Context/login/AuthContext';
//draf-js
import { convertToRaw,convertFromRaw, EditorState ,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import VideoContext from 'web-app/Context/video/VideoContext';


const AddNote=({vidid,modalClose})=>{
    let {toastdispatch} = useContext(VideoContext)
    let {token} = useAuth()
    const [text,settext] = useState("")
    const [desc,setdesc] = useState("")
    const [editorState,seteditorState] = useState(EditorState.createEmpty())
    const [rawMessage,setrawMessage]=useState("")
    const[isemty,setempty]=useState(true)
  
    const toolbarStyle={
        background:'transparent',
        border:"none"
    }

    const editorStyle = {
        height:'5rem',
        background:'transparent',
    }

    const onEditorStateChange =(editorState)=>{
        const content = editorState.getCurrentContent();
        const isEditorEmpty = !content.hasText();
        const currentPlainText = content.getPlainText()
        const lengthOfEditorContent = currentPlainText.length;
        const lengthOfTrimmedContent = currentPlainText.trim().length;
        const isContainOnlySpaces = !isEditorEmpty && !lengthOfTrimmedContent;
    
        if(isEditorEmpty || isContainOnlySpaces){
            
        }else{
            setempty(false)
        }

        seteditorState(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    const handleAddNote=()=>{
        if(text!=="" && !isemty){
            let note={
                title:text,
                text:editorState,
                videoId:vidid,
            }
            addNoteService(token,note,toastdispatch)
            settext("")
            setdesc("")
            modalClose()
      }else{
        toastdispatch({type:'WARNING',payload:"Add title and Description on note"})
      }
    }

    return(
       <div className='flex-col row-gap-2rem --background'>
           <input type="text" value={text} onChange={(e)=>settext(e.target.value)} placeholder="Add title.."/>
           <Editor
                initialEditorState={editorState}
                toolbarStyle={toolbarStyle}
                editorStyle={editorStyle}                                                                            
                onEditorStateChange={onEditorStateChange}
                placeholder='Add description...'
          />
          
           <button className='header-button-login' onClick={handleAddNote}> add note </button>
       </div>
    )
}

export default AddNote
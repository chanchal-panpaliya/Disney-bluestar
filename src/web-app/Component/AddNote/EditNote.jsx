import { useState,useContext } from 'react';
import './AddNote.css';
//draf-js
import { convertToRaw, EditorState ,convertFromHTML ,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor  } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import VideoContext from 'web-app/Context/video/VideoContext';
//redux
import { useDispatch, useSelector } from "react-redux";
import { editNote } from '../../Redux/Reducer/noteSlice';

const EditNote=({data,modalClose})=>{
    let {toastdispatch} = useContext(VideoContext)
    const [text,settext] = useState(data.title)
    //redux
    const { notelist } = useSelector((store) => store.note);
    const { token , user } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();
   
    //draf
    const blocksFromHtml = htmlToDraft(data.text);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorDataState = EditorState.createWithContent(contentState);
    const [editorState, setEditorState] = useState(editorDataState);
  
    const toolbarStyle={
        background:'transparent'
    }

    const editorStyle = {
        height:'5rem',
        background:'transparent',
    }

    const onEditorStateChange = (editorStateData) => {
        setEditorState(editorStateData);
    };

    const handleEditNote=()=>{
        let note={
            _id:data._id,
            title:text,
            text:draftToHtml(convertToRaw(editorState.getCurrentContent())),
            videoId:data.videoId,
        }
        dispatch(editNote([token,note,toastdispatch]))
        settext("")
        modalClose()
    }

    return(
       <div className='flex-col row-gap-2rem'>
           <input type="text" value={text} onChange={(e)=>settext(e.target.value)} placeholder="add text"/>
           <Editor
             editorState={editorState}
             toolbarStyle={toolbarStyle}
             onEditorStateChange={onEditorStateChange}
             editorStyle={editorStyle}                                                                         
             placeholder='add description'
            />
           <button className='header-button-login' onClick={handleEditNote}> Edit note </button>
       </div>
    )
}

export default EditNote
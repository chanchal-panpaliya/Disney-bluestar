import { useState } from 'react';
import './AddNote.css';
const AddNote=({videoId,data})=>{
    const [text,settext] = useState(data.note)

    const handleNote=()=>{

    }

    return(
       <div>
           <input type="text" value={text} onChange={(e)=>settext(e.target.value)} placeholder="add text"/>
           <button onClick={handleNote()}> add/edit note </button>
       </div>
    )
}

export default AddNote
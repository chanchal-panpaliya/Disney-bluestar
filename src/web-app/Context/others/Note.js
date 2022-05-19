const NoteReducer=(state,action)=>{
    switch(action.type){
        case "ADD_NOTE" :{
             return {...state,notedata : action.payload}
        }

       
        default :
        return state
     }
 }

export default NoteReducer
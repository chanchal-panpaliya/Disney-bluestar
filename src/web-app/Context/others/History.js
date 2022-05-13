const HistoryList=(state,action)=>{
    switch(action.type){
        case "ADD_HISTORY" :{
             return {...state,historylist : action.payload}
        }

        case "REMOVED_HISTORY":{
            return {...state,historylist : action.payload} 
        }

        case "DELETE_ALL_HISTORY":{
            return {...state,historylist : action.payload} 
        }
       
        default :
        return state
     }
 }

export default HistoryList
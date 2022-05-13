const LikedList=(state,action)=>{
    switch(action.type){
        case "LIKED" :{
             return {...state,liked : action.payload}
        }

        case "DISLIKED":{
            return {...state,liked : action.payload} 
        }
       
        default :
        return state
     }
 }

export default LikedList
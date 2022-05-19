const Uploadreducer=(state,action)=>{
    switch(action.type){
        case "ADD_NEW_VIDEO" :{
             return {...state,uploadedvideo : action.payload}
        }
        
        default :
        return state
     }
 }


 const ViewCountreducer=(state,action)=>{
    switch(action.type){

        case "GET_ALL_VIDEO":{
            return{...state,viewcount:action.payload}        
        }

        case "VIDEO_VIEW_COUNT" :{
        let updatecart = state.viewcount.map((item,index)=>{
                    
                return {
                     ...item, view : item._id === action.payload._id ? item.view + 1 : item.view 
                } 
        })
       
        return{...state,viewcount:updatecart}
        }
        
        default :
        return state
     }
 }

export  {Uploadreducer,ViewCountreducer}
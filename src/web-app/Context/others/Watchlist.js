const WatchList=(state,action)=>{
    switch(action.type){
        case "ADD_WATCHLIST" :{
             return {...state,watchlist : action.payload}
        }

        case "REMOVED_WATCHLIST":{
            return {...state,watchlist : action.payload} 
        }
       
        default :
        return state
     }
 }

export default WatchList
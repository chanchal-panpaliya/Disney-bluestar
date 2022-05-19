const ContinuewatchReducer =(state,action)=>{
    switch(action.type){
        case "ADD_CONTINUE_WATCH" :{
            const checker = state.Continuewatchlist.find((item) => {
                return item._id === action.payload._id;
              });
              
              if(!checker) {
                return{...state,Continuewatchlist : [...state.Continuewatchlist,action.payload]}
              }

        }
       
        default :
        return state
     }
 }
export default ContinuewatchReducer;
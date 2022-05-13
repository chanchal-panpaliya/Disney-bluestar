const FilterReducer=(state,action)=>{

    switch(action.type){  
        case "CATEGORY_TYPE" :{
            return{...state,categoryType:action.payload}
        }

        case "SORT":{
            return{...state,sort:action.payload}
        }
        
        default :
        return state
    }
}

export default FilterReducer;
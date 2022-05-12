export const get_Category_Type = (data,type)=>{
    if(data.length>0 && type!==""){
        if(type==="All"){
            return data
        }else{
            return data.filter((item) => item.categoryType === type);
        }  
    }else{
        return data
    }      
}

export const get_SORT_DATA =(data,type)=>{
    if(type==="asc-by-title"){
       return [...data].sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase(), "de", { sensitivity: "base" }));
    }
    
    if(type==="dec-by-title"){
        return [...data].sort((a, b) => b.title.toUpperCase().localeCompare(a.title.toUpperCase(), "de", { sensitivity: "base" }));
    }

    if(type==="asc-by-date"){
        return [...data].sort(( a, b) =>{
            return new Date(a.uploadedOn) - new Date(b.uploadedOn);
        })
    }

    if(type==="dec-by-date"){
        return [...data].sort(( a, b) =>{
            return new Date(b.uploadedOn) - new Date(a.uploadedOn);
        })
    }

    if(type==="clear"){
          return data
    }

    return data 
}
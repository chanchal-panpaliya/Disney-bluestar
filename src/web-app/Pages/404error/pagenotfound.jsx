import { useEffect } from "react";

const PageNotFound = () =>{
    useEffect(()=>{
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    },[])
    return(
        <div>
            ohh! Page Not Found
        </div>
    )
}

export default PageNotFound;
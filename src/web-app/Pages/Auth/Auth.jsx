import { useState,useContext,useEffect } from "react"
import Login from "./Login";
import  Register from "./Register";
import ForgotPassword from "./ForgotPassword";


const Auth =({modalClose,page})=>{
    const [route,setroute]=useState(page==="forgotpassword"?"forgopassword":"login")

      return(
          <div>
                {route === "login" && <Login routeRegister={()=>setroute("register")} routeForgotPassword={()=>setroute("forgopassword")} modalClose={modalClose}/> }
                {route === "register" && <Register routeLogin={()=>setroute("login")} modalClose={modalClose}/> }
                {route === "forgopassword" && <ForgotPassword routeLogin={()=>setroute("login")} routeRegister={()=>setroute("register")} modalClose={modalClose}/> }  
          </div>
      )
  }

export default Auth
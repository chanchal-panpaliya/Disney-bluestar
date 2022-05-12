import './Auth.css';
import '../../Component/Modal/Modal.css';
import { useState ,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { handleRegistration } from '../../Service/service';

const Register = ({routeLogin,modalClose}) =>{
    const navigator = useNavigate();
    const [firstname,setName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [error, setError] = useState("");
    const [lastname,setLastName]=useState("");
    const [termsAndConditions,settermsAndConditions]=useState(false);
    const [hideshowpassword,sethideshowpassword]=useState(false);
    const [hideshow_rety_Pass,Sethideshow_rety_Pass]=useState(false);


    const validateemail=(e)=>{
        const emailRegex = /\S+@\S+\.\S+/;
        setEmailId(e.target.value)
        if (!emailRegex.test(e.target.value.toLowerCase())) {
            setError("Enter a valid email address");
        } else {
            setError("");
        }
    }


    return(
    <div className='flex-col'>
        <h4 className='text-trasn-cap'> Registration </h4>
          <form onSubmit={(e)=>handleRegistration(e,emailId,password,firstname,lastname,termsAndConditions,navigator,modalClose,setError)}> 
            <div className="flex-row  col-gap-2rem textField-container --background">  
                <input type="text" name="firstName" value={firstname} placeholder="John" className="text-input" onChange={(e)=>{setName(e.target.value)}} required/>
                <label className="text-placeholder --background"> Enter First Name </label>                                                
            </div>

             <div className="flex-row  col-gap-2rem textField-container --background">  
                <input type="text" name="lastName" value={lastname} placeholder="Doe" className="text-input" onChange={(e)=>{setLastName(e.target.value)}} required/>
                <label className="text-placeholder --background"> Enter Last Name </label>                                                
            </div>    
            
            <div className="flex-row  col-gap-2rem textField-container --background">  
                <input type="email" name="email" value={emailId} placeholder="johndoe@gmail.com" autocomplete="off" className="text-input" onChange={(e)=>validateemail(e)} required/>
                <label className="text-placeholder --background"> Email Id </label>                                                
            </div>

            <div className="flex-row  col-gap-2rem textField-container --background">  
                <input type= {hideshowpassword?"text":"password"} name="password" value={password} className="text-input" autocomplete="off" onChange={(e)=>{setPassword(e.target.value)}} required/>
                <input type="checkbox" className="check-show-password" value={hideshowpassword} onChange={(e)=>{sethideshowpassword(!hideshowpassword)}}/> 
                <label className="text-placeholder --background"> Password </label>                                                
            </div>

            <div className="flex-row  col-gap-2rem textField-container --background">  
                <input type={hideshow_rety_Pass?"text":"password"} value={retypedPassword} className="text-input" onChange={(e)=>{setRetypedPassword(e.target.value)}} required/>
                <input type="checkbox" className="check-show-password" value={hideshow_rety_Pass} onChange={(e)=>{Sethideshow_rety_Pass(!hideshow_rety_Pass)}}/> 
                <label className="text-placeholder --background"> Confirm password </label>                                             
            </div>

            <div className="flex-row  col-gap-2rem textField-container --background">  
               <input  type='checkbox' name="termsAndConditions" checked={termsAndConditions} onChange={()=>settermsAndConditions(!termsAndConditions)}/>  
               <span className='--background'> I accept all Terms & Conditions </span>                                         
            </div>
         
                {(password!==retypedPassword) && (retypedPassword!=="") ? "password not matched" : ""}  
                 <br/>
                {error}


                {firstname && lastname && emailId && password && retypedPassword && password===retypedPassword && !error && termsAndConditions && (
                        <button className={'button button-login --background'} type="submit"> sign up  </button>
                )}
                
        </form>  

             <a onClick={routeLogin} className="flex-row flex-justify-content-center flex-align-item-center --background"> Already have account? </a>

        </div>
    )
}

export default Register
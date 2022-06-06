import './Auth.css';
import '../../Component/Modal/Modal.css';
import { useState } from 'react';


const ForgotPassword = ({routeLogin,routeRegister}) =>{
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [hideshowpassword,sethideshowpassword]=useState(false);
    const [hideshow_rety_Pass,Sethideshow_rety_Pass]=useState(false);

    return(
        <div className='flex-col'>
             <h4> ForgotPassword </h4>
             <section> 
                <div className="flex-row  col-gap-2rem textField-container">  
                    <input type="email" name="email" value={emailId} placeholder="johndoe@gmail.com" autocomplete="off" className="text-input" onChange={(e)=>setEmailId(e.target.value)} required/>
                    <label className="text-placeholder"> Email Id </label>                                                
                </div>

                <div className="flex-row  col-gap-2rem textField-container">  
                    <input type= {hideshowpassword?"text":"password"} name="password" value={password} className="text-input" autocomplete="off" onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <input type="checkbox" className="check-show-password" value={hideshowpassword} onChange={(e)=>{sethideshowpassword(!hideshowpassword)}}/> 
                    <label className="text-placeholder"> Password </label>                                                
                </div>

                <div className="flex-row  col-gap-2rem textField-container">  
                    <input type={hideshow_rety_Pass?"text":"password"} value={retypedPassword} className="text-input" onChange={(e)=>{setRetypedPassword(e.target.value)}} required/>
                    <input type="checkbox" className="check-show-password" value={hideshow_rety_Pass} onChange={(e)=>{Sethideshow_rety_Pass(!hideshow_rety_Pass)}}/> 
                    <label className="text-placeholder"> Confirm password </label>                                             
                </div>

                {!emailId && !password && !retypedPassword && password!==retypedPassword && (
                        <button type='submit' className={'button disabled-button-pointer'} disabled> Forgot Password  </button>
                )}
                
                {emailId && password && retypedPassword && password===retypedPassword && (
                        <button className={'button button-login'} type="submit"> Forgot Password  </button>
                )}

            </section>
            <div className='flex-row flex-justify-content-flex-space-between typology-padding-top'>
                <a  onClick={routeLogin}> Login </a>
                <a  onClick={routeRegister}> Registartion </a>
            </div>
        </div>
    )
}

export default ForgotPassword
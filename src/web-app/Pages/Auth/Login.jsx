import './Auth.css';
import '../../Component/Modal/Modal.css';
import { useState,useEffect  } from 'react';
import {useNavigate} from 'react-router-dom';
import { handleLogin } from '../../Service/service';
import { useAuth } from '../../Context/login/AuthContext';

const testCredentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
    rememberMe: true,
  };

  const formInitialState = {
    email: "",
    password: "",
    rememberMe: false,
  };

const Login = ({routeRegister,routeForgotPassword,modalClose}) =>{
    const [formData, setFormData] = useState(formInitialState);
    const { email, password, rememberMe } = formData;
    const [hideshowpassword,sethideshowpassword]=useState(false);
    const navigator = useNavigate();
    const [error, setError] = useState("");
    let {setToken,setUser} = useAuth();


    const handleInput = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));

  const handleToggle = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.checked,
    }));


    return(
        <div className='flex-col flex-justify-content-center flex-align-item-center'>
            <h4 className='text-trasn-cap'>  Login </h4>
            <form onSubmit={(e)=>handleLogin(e,email,password,navigator,modalClose,setError,setToken,setUser)}>
                    <div className="flex-row  col-gap-2rem textField-container --background">  
                        <input type="email" name="email" value={email} placeholder="johndoe@gmail.com" autocomplete="off" className="text-input" 
                        onChange={handleInput} required/>
                        <label className="text-placeholder --background"> Email Id </label>                                                
                    </div>
                    <div className="flex-row  col-gap-2rem textField-container --background">  
                        <input type= {hideshowpassword?"text":"password"} name="password" value={password} className="text-input" autocomplete="off" 
                        onChange={handleInput} required/>
                         <input type="checkbox" className="check-show-password" value={hideshowpassword} onChange={(e)=>{sethideshowpassword(!hideshowpassword)}}/> 
                        <label className="text-placeholder --background"> Password </label>                                                
                    </div>
                    <div className='--background typology-padding-top'>
                      <input onChange={handleToggle} type='checkbox' name='rememberMe' id='remember-me' checked={rememberMe}/>
                        <span> 
                           Remember me
                        </span>
                    </div>

                    {!email && !password && (
                        <button type='submit' className={'button disabled-button-pointer'} disabled> Login </button>
                    )}

                    {email && password && (
                        <button type='submit' className={'button button-login'}> Login </button>
                    )}

                 </form> 
               <br/><br/>
              <button type='button' onClick={() =>  setFormData(testCredentials)} className={'button button-login btn-crediantial'}>  Use test credentials </button>
              {error}
            <div className='flex-row flex-justify-content-flex-space-between typology-padding-top --background'>
                <a  onClick={routeForgotPassword}> forgot password ? </a>
                <a  onClick={routeRegister}> Registartion </a>
            </div>
           
        </div>
    )
}

export default Login
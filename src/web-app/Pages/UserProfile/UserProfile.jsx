import './UserProfile.css';
import Header from 'web-app/Component/Header/Header';
import Footer from 'web-app/Component/Footer/Footer';
import profile from '../../img/images/temp/profile.png';
import { useEffect ,useState ,useContext} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { Auth_Modal } from '../../Component/Modal/Modal';
import VideoContext from 'web-app/Context/video/VideoContext';
//redux
import { useDispatch, useSelector } from "react-redux";
import { DeleteAllHistoryData } from 'web-app/Redux/Reducer/historySlice';
import {logoutUser} from "../../Redux/Reducer/authSlice"

const UserProfile = () =>{
    let {toastdispatch} = useContext(VideoContext);
    let navigator = useNavigate();
    const [ismodal,setmodal]=useState(false)
    // redux
    const dispatch = useDispatch();
    const { token , user } = useSelector((store) => store.authentication);

  useEffect(()=>{
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  },[])

  const logout=()=>{
    const data = dispatch(logoutUser({toastdispatch,navigator}))
         if(data.payload.user==null && data.payload.token==null){
            toastdispatch({type:'DANGER',payload:"LOGOUT SUCCESSFULL"})
            navigator("/")   
         }
 }

  return(
    <div>
    <Header/>
        <div className='page-container-userprofile'>
           <div className='page-data-display-userprofile'>
               <header className='like-page-header-userprofile'>
                   <img className='like-page-round-circle-userprofile' src={profile} />
               </header>
               <section className='like-page-body-userprofile col-gap-2rem like-page-body-userprofile'>
                <div className='card profile-card'>
                <div className="table-profile">
                    <div className='row-profile'>
                        <div className='column-profile'> <b> FirstName </b> </div>
                        <div className='column-profile'> {user.firstName || user.firstname}</div>
                    </div>
                    <div className='row-profile'>
                        <div className='column-profile'> <b> LastName </b> </div>
                        <div className='column-profile'> {user.lastName || user.lastname}</div>
                    </div>  
                    <div className='row-profile'>
                        <div className='column-profile'> <b>Email-id </b> </div>
                        <div className='column-profile'> {user.email}</div>
                    </div>
                </div>  
                </div>
                <div className='profile-summary'> 
                <div className="table-profile table-padding">
                    <div className='row-profile'>
                        <div className='column-profile'> liked </div>
                        <div className='column-profile'> 
                            <Link to="/liked"> 
                                <button className='button button-login'> liked </button> 
                            </Link> 
                        </div>
                    </div>  
                    <div className='row-profile'>
                        <div className='column-profile'> <b> watchlist </b> </div>
                        <div className='column-profile'> 
                         <Link to="/watchLater">
                            <button className='button button-login'> watch </button> 
                          </Link>
                        </div>
                    </div>

                    <div className='row-profile'>
                        <div className='column-profile'>  playlist  </div>
                        <div className='column-profile'> 
                          <Link to="/playlist"> <button className='button button-login'> playlist </button> </Link>
                        </div>
                    </div>

                    <div className='row-profile'>
                        <div className='column-profile'>  history  </div>
                            <div className='column-profile'> 
                                <Link to="/history">  <button className='button button-login'> history </button> </Link>
                            </div>
                    </div>
                    <div className='row-profile'>
                        <div className='column-profile'> clear history </div>
                        <div className='column-profile'> <button className='button button-login' 
                        onClick={()=>dispatch(DeleteAllHistoryData([token,toastdispatch]))}
                        > clear </button> </div>
                    </div>  
                    <div className='row-profile'>
                        <div className='column-profile'> <b> forgot password </b> </div>
                        <div className='column-profile'> <button className='button button-login' onClick={(e)=>{setmodal(!ismodal)}}> forgot </button> </div>
                    </div>
                    <div className='row-profile'>
                        <div className='column-profile'>  logout  </div>
                        <div className='column-profile'> <button className='button button-login' onClick={logout}> logout </button> </div>
                    </div>
                </div> 
                </div> 
               </section>
          </div>
        </div>
        {
             ismodal ? <Auth_Modal  modalClose={()=>setmodal(false)} page="forgotpassword"/> :null
         }
      <Footer/>
    </div>
  )
}

export default UserProfile;
import './UserProfile.css';
import Header from 'web-app/Component/Header/Header';
import Footer from 'web-app/Component/Footer/Footer';
import profile from '../../img/images/temp/profile.png';
import { useEffect ,useState ,useContext} from 'react';
import { useAuth } from 'web-app/Context/login/AuthContext';
import { Link , useNavigate } from 'react-router-dom';
import { Auth_Modal } from '../../Component/Modal/Modal';
import VideoContext from 'web-app/Context/video/VideoContext';
import { handler_removeallHistory } from 'web-app/Service/service';

const UserProfile = () =>{
    let {removed_all_historys,toastdispatch} = useContext(VideoContext);
    let {token,user}=useAuth();
    let navigator = useNavigate();
    const [ismodal,setmodal]=useState(false)


  useEffect(()=>{
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  },[])

  const logout=()=>{
    if (token!=null) { 
        localStorage.removeItem('token') 
        localStorage.removeItem('user') 
        window.location.reload();
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
                        <div className='column-profile'> <button className='button button-login' onClick={()=>handler_removeallHistory(token,removed_all_historys,toastdispatch)}> clear </button> </div>
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
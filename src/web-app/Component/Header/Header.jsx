//react
import { useContext, useState , useEffect , useRef} from 'react';
import { Link ,useNavigate ,useLocation } from "react-router-dom";
//
import { fetchAllVideoData } from 'web-app/Service/service';
//css
import './Header.css';
import '../../Pages/VideoList/Menu.css';
//constant
import menu from '../../Constant/menu';
import sidemenuItem from '../../Constant/sidemenu';
//
import { Auth_Modal } from '../Modal/Modal';
//context
import VideoContext from '../../Context/video/VideoContext';
import logo from '../../img/images/logo.png';
//redux
import { useDispatch, useSelector } from "react-redux";
import {logoutUser} from "../../Redux/Reducer/authSlice"

const Header =() =>{
    const navigator = useNavigate()
    let {menuselected,filter_dispatch,toastdispatch} = useContext(VideoContext);
    const [ismodal,setmodal]=useState(false)
    const [sidemenu,setsidemenu]=useState(false)
    //
    const [getTite,setTitle]=useState("");
    const [alldata,setalldata] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const textfocus = useRef();
    //redux
    const dispatch = useDispatch();
    const { token , user } = useSelector((store) => store.authentication);
    
    useEffect(()=>{
        fetchAllVideoData().then(function(result){
            setalldata(result)  
        });
        window.scrollTo({ behavior: 'smooth', top: '0px' });
     },[])

     const logout=()=>{
        const data = dispatch(logoutUser({toastdispatch,navigator}))
        
         if(data.payload.user==null && data.payload.token==null){
            toastdispatch({type:'DANGER',payload:"LOGOUT SUCCESSFULL"})
            navigator("/")   
         }

     }

     const handleChange =(e)=>{
    
        setTitle(e.target.value);
        
        let filterdatabytitle = alldata.filter((item)=>{
             return item.title.toLowerCase().includes(getTite.toLowerCase()) 
        })
        setSearchResults(filterdatabytitle)
     }

     const openProductDetailsPage = (item) => {
         navigator(`/videolist/${item._id}`)
         setSearchResults([])
         setTitle('')
     }

    return(
        <div className='header-container'>
        <div className='header-container-flex'>
            {/* /LoGo/ */}
            <div className='header-left-end'>
                
            </div>
            <Link to={"/"} onClick={(e)=>menuselected("home")}>
            <div className='header-logo'>
                <div>
                    <Link to="/" > 
                        <img className="logoimage-size" src={logo}/>
                    </Link>
                </div>
                <div className='logo-sub-heading'>
                </div>
            </div>
            </Link>
               {/* /Menu Bar/ */}
               <div className='flex-row header-menu-container --background'>
                   <ul className='header-menu-content --background'>
                       {
                           menu.menulist.map((item,index)=>{
                               return(
                                   <Link className='background-white --background' to={item.Link} key={index} onClick={(e)=>{menuselected(item.menu_name); filter_dispatch({type:"CATEGORY_TYPE",payload:"All"}); window.scrollTo({ behavior: 'smooth', top: '0px' });}}> 
                                        <li className={localStorage.getItem('VIDEO_MENU_SELECTED')==item.menu_name?'active-menu background-white':'background-white'}> {item.menu_img===""?item.menu_name:<img src={item.menu_img}/>} </li>
                                   </Link>
                               )
                           })
                       }
                   </ul>
                </div>
              {/* /Search Bar/ */}
              <div className='header-right-container'>
                    <div className='header-search'>
                        <input className='search-text-input' type="search" placeholder='Search' value={getTite} onChange={handleChange}/>
                        {
                            getTite!==""?
                             searchResults.length !== 0 && <> 
                                <div className='searchResults'>
                                      {searchResults.map((item,index) => <p key={index} className="searchList" onClick={()=>openProductDetailsPage(item)}> 
                                         <img style={{width:'100px',height:'100px'}} src={item.thumbnail.url}/>
                                         <label className='flex-row col-gap-1rem'> {item.title} {item.episode_id} </label> 
                                      </p>)}
                                </div></>
                            : null
                        }
                   </div>
               
                   <div className='header-login-container'>
                        {
                            token!==null? 
                            <>
                             <button className='header-button-login'> Logout </button>
                             <div className="dropdown-login-content"> 
                                <h6 className='--background --color-secondary'> Hi!  {user.firstName || user.firstname} </h6>
                                <button className='logout-button' onClick={()=>logout()}> Logout </button>
                             </div>
                            </>  
                            :
                            <button className='header-button-login' onClick={(e)=>{setmodal(!ismodal)}}> 
                                Login 
                            </button>
                        }
                   </div>
              </div>
              <div className='header-right-end'>
              <div className='header-more-container'>
               {
                            token!==null? 
                    <>
                        <button className='header-button-more' onClick={()=>setsidemenu(!sidemenu)}> <i className="fa-solid fa-user-gear gear-size"></i> </button>
                        <nav className={sidemenu ? "nav-menu active" : "nav-menu"}>
                           <ul className="nav-menu-items" onClick={()=>setsidemenu(!sidemenu)}>
                                <li className="navbar-toggle">
                                    <i className="fa-solid fa-xmark"></i>
                                </li>
                                <li className='profile-circle'>
                                        {user.firstName?user.firstName[0].toUpperCase():null} 
                                        {user.firstname?user.firstname[0].toUpperCase():null}
                                </li>
                                <li className='padding-menu-item'> 
                                {sidemenuItem.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                    <Link to={item.route} className="flex-row col-gap-2rem">
                                         {item.Icon}
                                        <span className='--background'>{item.name}</span>
                                    </Link>
                                    </li>
                                );
                                })}
                                </li>
                            </ul>
                            </nav>
                        </> : null
               }
                  </div>  
              </div>
        </div>

         {
             ismodal ? <Auth_Modal modalClose={()=>setmodal(false)}/> :null
         }

     </div>
    )
  }

  export default Header;
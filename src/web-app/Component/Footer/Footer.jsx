//react
import { Link } from 'react-router-dom';
import { useContext, useState , useEffect} from 'react';

//css
import './Footer.css';
import '../Header/Header.css';
import '../Menu/ProductMenu.css';

//constant
import menu from '../../Constant/menu';
import {footerlink} from './FooterConstant';
import logo from '../../img/images/logo.png';
import VideoContext from '../../Context/video/VideoContext';

function Footer() {
    let {menuselected,selectedMenu,filter_dispatch} = useContext(VideoContext);
    return (
        <footer>
            <div class="footer-container  --background">
                <div class="footer-row  --background">
                    <div class="footer-col-2  --background"> 
                        <div className='header-logo  --background'>
                            <div>
                                <Link to="/" > 
                                    <img className="logoimage-size" src={logo}/>
                                </Link>
                            </div>
                            <div className='logo-sub-heading  --background'>
                            </div>
                        </div>
                        <div className='productMenu-container-flex  --background'> 
                        {
                             
                                menu.menulist.map((item,index)=>{
                                    return(
                                        <Link className='background-white --background list-style-type-none' to={item.Link} key={index} onClick={(e)=>{menuselected(item.menu_name);filter_dispatch({type:"CATEGORY_TYPE",payload:"All"}); window.scrollTo({ behavior: 'smooth', top: '0px' });}}> 
                                             <li className={selectedMenu==item.menu_name?'active-menu background-white':'background-white'}> {item.menu_img===""?item.menu_name:<img src={item.menu_img}/>} </li>
                                        </Link>
                                    )
                                })
                             
                            }
                        </div>
                     </div>
                      
                       <div class="footer-col-3  --background"> 
                        <h3> Follow us </h3>
                        <ul className='list-style-type-none --background flex-row col-gap-2rem flex-justify-content-center'>
                            {
                                footerlink.map((item,index)=>{
                                    return <li key={index} className="list-style-type-none --background"> 
                                              <a href={item.link} className="--background" target="_blank" rel="noopener noreferrer"> {item.name} </a>  
                                            </li>
                                })
                            }
                        </ul> 
                       </div>
                       <div class="footer-col-3  --background"> 
                          <h3>  </h3>
                          <ul>
                              <li>  </li>
                              <li> </li>
                              <li> </li>
                              <li>  </li>
                          </ul>
                       </div>
                   </div>
                   <hr/>
                   <p class="copyright">  copyright 2022 - @chanchalpanpaliya </p>
                </div>
        </footer>

    )
}

export default Footer ;
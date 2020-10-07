import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './style.css';

/**
* @author
* @function Header
**/

const Header = (props) => {

  const auth = useSelector(state => state.auth);

  return(
    <header className="header">
        <div style={{ display: 'flex' }}>
            <div className="logo">Web Messenger</div>
            {
                !auth.authenticated ?
                <ul className="leftMenu">
                    <li><NavLink to={'/login'}>Login</NavLink></li>
                    <li><NavLink to={'/signup'}>Sign up</NavLink></li>
                </ul> : null
            }
        </div>
        <div style={{ margin:'20px 0', color: '#fff', fontWeight:'bold' }}>
            {
                auth.authenticated ? `Hi ${auth.firstName} ${auth.lastName}` : ''
            }
        </div>
        <ul className="menu">
           {
               auth.authenticated ?
               <li>
                  <Link to={'#'} onClick={props.logout}>Logout</Link>
               </li> : null
           }
        </ul>
    </header>
   )

 }

export default Header
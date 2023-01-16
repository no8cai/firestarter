import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css'
import LogoutButton from "../auth/LogoutButton";
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';

function Navigation() {
    return (
        <nav className="nav-container">
        <div className="navbar">
            <div className="left-nav">
               <span>Discover</span>
               <span>Start a project</span>
           </div>
   
           <div className="mid-nav">
           <NavLink to='/' exact={true} activeClassName='active'>
            Firestarter
          </NavLink>
           </div>
   
           <div className="right-nav">
               <span>Search</span>
               <span> <ProfileButton /></span>
               {/* <span> <ProfileButton user={sessionUser} /></span> */}


               {/* <span><NavLink to='/login' exact={true} activeClassName='active'>
                Login
                </NavLink>
                </span> */}


                {/* <span>

            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
             )}
                </span> */}
           </div>
       </div>
    </nav>
    )
}


export default Navigation;
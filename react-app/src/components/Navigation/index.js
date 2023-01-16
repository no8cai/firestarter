import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css'
import LogoutButton from "../auth/LogoutButton";
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory()

    const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
        }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);


    return (
        <nav className="nav-container">
        <div className="navbar">
            <div className="left-nav">
               <span>Discover</span>
               <span>Start a project</span>
           </div>
   
           <div className="mid-nav">
           <NavLink to='/' exact={true} activeClassName='active'>
            FIRESTARTER
          </NavLink>
           </div>
   
           <div className="right-nav">
               <span>Search</span>


                <span>

            {isLoaded && (
                <>
                    <ProfileButton user={sessionUser} />
                </>
             )}
                </span>
           </div>
       </div>
    </nav>
    )
}


export default Navigation;
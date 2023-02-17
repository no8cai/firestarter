import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css'
import LogoutButton from "../auth/LogoutButton";
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';
import SearchBar from "../Search/SearchBar";
import OpenSearchModal from "../Search/OpenSearchModal"
import OpenModalMenuItem from "./OpenModalMenuItem";
import logo from '../../../src/images/flogo.png'
import aaicon from '../../../src/images/aaicon.png'


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
                <a title="Clicking will leave Firestarter!" href="https://www.appacademy.io/">
                    <span><img className="aa-icon" src={aaicon}></img></span>
               <span >Check out AppAcademy!</span>
                </a>
               
           </div>
   
           <div className="mid-nav">
           <NavLink to='/' exact={true} activeClassName='active'>
            <img className='logo-img' src={logo}></img>
          </NavLink>
           </div>
   
           <div className="right-nav">
            <div className="search-button-holder">
                <OpenSearchModal
                itemText={"Search"}
                onItemClick={closeMenu}
                modalComponent={<SearchBar />}
              />
              <div><i className="fa-solid fa-magnifying-glass"></i></div>
            </div>
           


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
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, Route, useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton';
import './Navigation.css'
import UserDataModal from "./LoggedInUser";

function ProfileButton({ user }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
  
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
  
    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      closeMenu();
      history.push('/')
    };
  
    let ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    if (!user) ulClassName = "profile-dropdown2" + (showMenu ? "" : " hidden")
  
    return (
      <div className='profile-button-div'>
        <button onClick={openMenu} className="profile-button">
        {/* <i className="fa-solid fa-bars" />
          <i className="fas fa-user-circle"></i> */}
        </button>
        <div className={ulClassName} ref={ulRef}>
          {user ? (
            <div className='modal-dropdown'>
              <UserDataModal user={user}/>
              {/* <p className="logoutbutton"><button onClick={logout}>Logout</button></p> */}
            </div>
          ) : (
              <div className='signup-button'>
            <div className='login-button'>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal 
                />}
              />
            </div>
              
              <div ></div>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            
          )}
        </div>
      </div>
    );
  }
  
  export default ProfileButton;
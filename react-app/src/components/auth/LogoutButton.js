import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory, Redirect } from 'react-router-dom';
import OpenModalMenuItem
 from '../Navigation/OpenModalMenuItem';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

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

  const onLogout = async (e) => {
    history.push('/')
    await dispatch(logout());
    await dispatch(closeMenu())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;

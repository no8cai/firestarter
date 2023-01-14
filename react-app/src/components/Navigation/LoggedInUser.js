import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, Route, useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton';
import './Navigation.css'
import { getByCurrentUser } from "../../store/pledge";

function UserDataModal({user}) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
      dispatch(getByCurrentUser())
    }, [dispatch])

    const userPledgesObj = useSelector(state => state.pledges)
    const userPledges = Object.values(userPledgesObj)
    console.log(userPledges)
  
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
    if (!userPledgesObj) return null

    return (
        <div className='dropdown-container'>
                <div className="nav-box-user-data">

                <div className="nav-user-info">
                  <p>User Info</p>
                  <p>{user.username}</p>
                <p id="useremailline">{user.email}</p>
                </div>
                <div className="nav-backed-container">
                  <p>Backed Projects</p>
                  {user && (userPledges.map(pledge => {
                    return (
                        <div className="nav-backed-item">
                            <Link to={`/projects/${pledge.Project.id}`}>

                            <div className="nav-thumbnail">{<img className="backed-thumbnail" src={pledge.Project.imageUrl}></img>}</div>
                            <div className="nav-backed-title">{pledge.Project.title}</div>
                            </Link>
                        </div>
                    )
                  }))}
                </div>
                <div className="nav-created-container">
                  <p>Created Projects</p>
                </div>
                </div>
                
                <p className="logoutbutton"><button onClick={logout}>Logout</button></p>
              </div>
    )
}

export default UserDataModal;
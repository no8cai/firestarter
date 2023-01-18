import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import { Link, Route, useHistory } from 'react-router-dom'
// import OpenModalButton from '../OpenModalButton';
import './Navigation.css'
import { getAllPledges, getPledgesByCurrentUser } from "../../store/pledge";
import { fetchAllProjects } from "../../store/project";

function UserDataModal({user}) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(getPledgesByCurrentUser())
        // dispatch(fetchAllProjects())
    }, [dispatch])

    const userPledges = useSelector(state => state.pledges.userPledges)
    const pledges = Object.values(userPledges)

    const allProjects = useSelector(state => state.projects)
    const projects = Object.values(allProjects)
    let userProjects = projects.filter(project => project.creatorId === user.id)
    
  
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
      dispatch(logout());
      closeMenu();
      history.push('/')
    };
    if (!userPledges || !user || !allProjects) return null
    // if (!userPledges || !user) return null

    return (
        <div className='dropdown-container'>
                <div className="nav-box-user-data">

                <div className="nav-user-info">
                  <p>User Info</p>
                  <Link to={'/profile'}>
                  <p>Profile</p>
                  </Link>
                  <p>{user.username}</p>
                <p id="useremailline">{user.email}</p>
                </div>
                <div className="nav-backed-container">
                  <p>Backed Projects</p>
                  {user && (pledges.map(pledge => {
                    return (
                        <div key={pledge.id} className="nav-backed-item">
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
                  {user && projects.length ? (userProjects.map(project => {
                    return (
                        <div key={project.id} className="nav-backed-item">
                            <Link to={`/projects/${project.id}`}>

                            <div className="nav-thumbnail">{<img className="backed-thumbnail" src={project.imageUrl}></img>}</div>
                            <div className="nav-backed-title">{project.title}</div>
                            </Link>
                        </div>
                    )
                  })): (null)}
                  <Link to={`/createproject`}>
                  <div>Create Project</div>
                  </Link>             
                </div>
                </div>
                
                <p className="logoutbutton"><button onClick={logout}>Logout</button></p>
              </div>
    )
}

export default UserDataModal;
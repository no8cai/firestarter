import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, Route, useHistory, Redirect } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton';
import './Navigation.css'
import { getAllPledges, getPledgesByCurrentUser } from "../../store/pledge";
import { fetchAllProjects } from "../../store/project";
import LogoutButton from "../auth/LogoutButton";
let otherSrc = 'https://ksr-ugc.imgix.net/assets/039/670/652/dc65feab31e919618d8c1041e23226ec_original.tiff?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1673737380&auto=format&frame=1&q=92&s=b22f9e32f0f2a6c2058ef5f07b35221d'



function UserDataModal({user}) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const [newSrc, setNewSrc] = useState('')


    useEffect(() => {
        dispatch(getPledgesByCurrentUser())
        dispatch(fetchAllProjects())
    }, [dispatch])

    const userPledges = useSelector(state => state.pledges.userPledges)
    const pledges = Object.values(userPledges)

    const allProjects = useSelector(state => state.projects)
    const projects = Object.values(allProjects)
    // console.log('userid',user.id)
    let userProjects = projects.filter(project => parseInt(project.creatorId) === parseInt(user.id))


    // useEffect(() => {
    //   if (!showMenu) return;

    //   const closeMenu = (e) => {
    //     if (!ulRef.current.contains(e.target)) {
    //       setShowMenu(false);
    //     }
    //   };

    //   document.addEventListener('click', closeMenu);

    //   return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

  //   const onLogout = async (e) => {
  //     closeMenu()
  //   await dispatch(logout());
  //   history.push('/')
  // };

  const logoutButton = async (e) => {
      const loggedOut = await dispatch(logout());
      if (loggedOut) {
        closeMenu()
        return history.push('/')}
    };

    // console.log(userProjects.length)
    if (!userPledges || !user || !allProjects) return null
    // if (!userPledges || !user) return null

    return (
        <div className='dropdown-container'>
                <div className="nav-box-user-data">

                <div className="nav-user-info">
                  <p className="nav-user-title">User Info</p>
                  <Link to={'/profile'}>
                  <p >Profile</p>
                  </Link>
                  <p>{user.username}</p>
                <p id="useremailline">{user.email}</p>
                </div>
                <div className="nav-backed-container">
                  <Link to="/profile/pledges"><p className="nav-user-title">Backed Projects</p></Link>

                  {user && (pledges.slice(0, 2).map(pledge => {
                    return (
                        <div key={pledge.id} className="nav-backed-item">
                            {/* <Link to={`/projects/${pledge.Project.id}/editpledge/${pledge.id}`}> */}
                            <Link to={`/profile/pledges`}>
                            <div className="nav-thumbnail">{<img className="backed-thumbnail" src={pledge.Project.imageUrl}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                              setNewSrc(otherSrc)
                              e.target.src = otherSrc
                              }
                              }}></img>}</div>
                            <div className="nav-backed-title">{pledge.Project.title}</div>
                            </Link>
                        </div>
                    )
                  }))}
                  {user && pledges.length > 2 ? (
                    <div className="user-stuff-extended">
                    <Link to="/profile/pledges" className="view-all-link">View all</Link>
                      </div>
                  ):(null)}
                </div>
                <div className="nav-created-container">
                  <Link to="/profile"><p className="nav-user-title">Created Projects</p></Link>

                  {user && userProjects.length ? (userProjects.slice(0, 2).map(project => {
                    return (
                        <div key={project.id} className="nav-backed-item">
                            <Link to={`/projects/${project.id}`}>

                            <div className="nav-thumbnail">{<img className="backed-thumbnail" src={project.imageUrl}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                              setNewSrc(otherSrc)
                              e.target.src = otherSrc
                              }
                              }}></img>}</div>
                            <div className="nav-backed-title">{project.title}</div>
                            </Link>
                        </div>
                    )
                  })): (null)}

                  {user && userProjects.length > 2 ? (
                    <div className="user-stuff-extended">
                    <Link to="/profile/" className="view-all-link">View all</Link>
                      </div>
                  ):(null)}

                  <Link className="create-project-link" to={`/createproject`}>
                  <div><i className="fa-solid fa-square-plus"></i> Create Project</div>
                  </Link>
                </div>
                </div>

                <p className="logoutbutton">
                  <button onClick={logoutButton}>Logout</button>
                  {/* <LogoutButton /> */}
                  </p>
              </div>
    )
}

export default UserDataModal;

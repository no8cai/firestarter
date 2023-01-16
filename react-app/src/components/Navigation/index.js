import React from "react";
import { NavLink } from 'react-router-dom';
import './Navigation.css'
import LogoutButton from "../auth/LogoutButton";


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
               <span><NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink></span>
           </div>
       </div>
    </nav>
    )
}
// function Navigation() {
//     return (
    //     <nav className="nav-container">
    //     <div className="navbar">
    //         <div className="left-nav">
    //            <span>Discover</span>
    //            <span>Start a project</span>
    //        </div>
   
    //        <div className="mid-nav">
    //            <span>Clonestarter</span>
    //        </div>
   
    //        <div className="right-nav">
    //            <span>Search</span>
    //            <span>Login Modal</span>
    //        </div>
    //    </div>
    // </nav>
//     )
// }

export default Navigation;
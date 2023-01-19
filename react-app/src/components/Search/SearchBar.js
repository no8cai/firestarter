import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, Route, useHistory, Redirect, useParams, useLocation } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton';
import './Search.css'
import { useSearchModal } from "../../context/SearchModal";

function SearchBar(){
    const [searchCriteria, setSearchCriteria ] = useState("")
    let { pathname } = useLocation()
    const [currentPath, setCurrentPath] = useState("")
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const { closeModal } = useSearchModal();

    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        if (isOpen === false){
            if (isOpen === true){
                closeModal()
                setIsOpen(false)
            } else {
                setIsOpen(true)
            }
        } else if (isOpen === true){
            closeModal()
            setIsOpen(false)
        }
    }, [pathname])
    
    

    const handleSubmit = async (e) => {

        e.preventDefault();
        closeModal()
        history.push(`/discover/${searchCriteria}`)
      };
    

    return (
        <div className="searchbar-holder">
            <form className="whole-searchbar" onSubmit={handleSubmit}>
                <input className="searchbar-input" minLength="3" placeholder="Search for projects or categories" type="text" value={searchCriteria} title="Searchbar" onChange={(e) => setSearchCriteria(e.target.value)} autoFocus/>
                <button type="submit" hidden >Submit</button>
            </form>
            <button className="searchbar-exit" onClick={closeModal}>X</button>
        </div>
    )

}

export default SearchBar;
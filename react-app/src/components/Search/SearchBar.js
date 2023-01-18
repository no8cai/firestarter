import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, Route, useHistory, Redirect } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton';
import './Search.css'
import { useSearchModal } from "../../context/SearchModal";

function SearchBar(){
    const [searchCriteria, setSearchCriteria ] = useState("")
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const { closeModal } = useSearchModal();
  

    const handleSubmit = async (e) => {

        e.preventDefault();
        closeModal()
        console.log('enter')
        history.push(`/discover/${searchCriteria}`)
        // return <Redirect to={`/discover/${searchCriteria}`} />;
      };
    

    return (
        <div className="searchbar-holder">
            <form className="whole-searchbar" onSubmit={handleSubmit}>
                <input className="searchbar-input" placeholder="Search" type="text" value={searchCriteria} title="Search for projects or categories" onChange={(e) => setSearchCriteria(e.target.value)} />
                <button type="submit" hidden >Submit</button>
            </form>
        </div>
    )

}

export default SearchBar;
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getPledgesByCurrentUser } from "../../../store/pledge";

const PledgeManager=()=>{

    const dispatch = useDispatch();

    // const projectsObj = useSelector(state => state.)

    return(
        <h1>hi im pledge</h1>
    )

}

export default PledgeManager
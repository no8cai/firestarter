import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePledge } from "../../store/pledge";
import { useHistory } from "react-router-dom";

const DeletePledge = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const pledgesArr = useSelector(state => state.pledges)
    const pledges = Object.values(pledgesArr)
    const pledge = pledges[0]

    const submitDelete = (e) => {
        e.preventDefault()
        dispatch(deletePledge(pledge.id))
        history.push('/')
    }

    return (
        <div>
            <button className="delete-btn" onClick={submitDelete}>Delete</button>
        </div>
    )
}
export default DeletePledge

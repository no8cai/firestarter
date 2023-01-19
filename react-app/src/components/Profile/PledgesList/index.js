import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getPledgesByCurrentUser } from "../../../store/pledge";
import { deletePledge } from "../../../store/pledge";
import React from "react"

const PledgeManager=()=>{

    const dispatch = useDispatch();

    const pledgesObj = useSelector(state => state.pledges.userPledges)
    const pledges = Object.values(pledgesObj);
    const history=useHistory();  

    useEffect(() => {
        dispatch(getPledgesByCurrentUser());
  }, [dispatch]); 

  const editEvents=(projectId,pledgeId)=>{
    history.push(`/projects/${projectId}/editpledge/${pledgeId}`)
}

  const deleteEvents=(id)=>{
    dispatch(deletePledge(id))
   }

    return(
        <h1>
        {pledges.map(({id,Project,Reward }) => (
        <div key={id} className='managebox'>
        <div className='boxitems'>
            <NavLink to={`/`} className="links">
            <h3>{Project.title}</h3>
            <div>{Reward.price}</div>
            <div>{Reward.title}</div>
            <div className='manageaddress'>
               {/* <div>{`${city},${state},${country}`}</div> */}
               {/* <div><i className="fas fa-star" />{avgRating}</div> */}
            </div>
            <div>
               {/* {`${fundingGoal}`} */}
            </div>
            </NavLink>
        </div>
        <div className="button-section">
            {/* <button className="buttons"><i className="fa-regular fa-pen-to-square" />Edit</button> */}
            {/* <button className='buttons'><i className="fa-solid fa-trash-can" />Delete</button> */}
            <button onClick={()=>editEvents(Project.id,id)} className="buttons"><i className="fa-regular fa-pen-to-square" />Edit</button>
            <button onClick={()=>deleteEvents(id)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button>
        </div>
        </div>
      ))}
</h1>
    )

}

export default PledgeManager
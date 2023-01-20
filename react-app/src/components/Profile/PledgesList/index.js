import { useDispatch,useSelector } from "react-redux";
import React, { useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getPledgesByCurrentUser } from "../../../store/pledge";
import { deletePledge } from "../../../store/pledge";
import './PledgeList.css'

const PledgeManager=()=>{
    const { pledgeId } = useParams()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pledgesObj = useSelector(state => state.pledges.userPledges)
    // const pledges = Object.values(pledgesObj);
    // const history=useHistory();
    const pledges = Object.values(pledgesObj).filter(el=>el.backerId==sessionUser.id);
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
        {
        pledges.map(({id,Project,Reward }) => {
            
        return (
            
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
      )}
      )}
</h1>
    )

}

export default PledgeManager

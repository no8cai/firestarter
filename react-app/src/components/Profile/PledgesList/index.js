import { useDispatch,useSelector } from "react-redux";
import React, { useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getPledgesByCurrentUser } from "../../../store/pledge";
import { deletePledge } from "../../../store/pledge";
import './PledgeList.css'

const PledgeManager=()=>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pledgesObj = useSelector(state => state.pledges.userPledges)
    const pledges = Object.values(pledgesObj);
    // const history=useHistory();
    // const pledges = Object.values(pledgesObj).filter(el=>el.backerId === sessionUser.id);
    // console.log("WHAT IS THISS", pledges)
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
   if(!pledgesObj) return null

    return(
        <h1>
            <div className="your-pledges">Your pledges</div>
        {pledges.length !== 0 ?
        (pledges.map((pledge) => {
            // console.log("REWARD???", pledge.Reward)
        return (

        <div key={pledge.id} className='managebox'>
        <div className='boxitems'>
            <NavLink to={`/projects/${pledge.projectId}`} className="projectlist-links">
            <div className="projectlist-item"><img src={pledge.Project.imageUrl} className="projectlist-image"/></div>
            <div className="projectlist-item">{pledge.Project.title}</div>
            <div className="projectlist-item">{pledge.Reward.price}</div>
            <div className="projectlist-item">{pledge.Reward.title}</div>
            <div className='manageaddress'>
            </div>
            <div>
               {/* {`${fundingGoal}`} */}
            </div>
            </NavLink>
        </div>
        <div className="button-section">
            <button onClick={()=>editEvents(pledge.projectId,pledge.id)} className="buttons"><i className="fa-regular fa-pen-to-square" />Edit</button>
            <button onClick={()=>deleteEvents(pledge.id)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button>
        </div>
        </div>
      )})
      ):(<div className='managebox'><div className="empty-notif"><span>You are not currently backing any projects.</span></div></div>)}
</h1>
    )

}

export default PledgeManager

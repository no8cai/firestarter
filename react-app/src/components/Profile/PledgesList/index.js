import { useDispatch,useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getPledgesByCurrentUser } from "../../../store/pledge";
import { deletePledge } from "../../../store/pledge";
import './PledgeList.css'
let otherSrc = 'https://ksr-ugc.imgix.net/assets/039/670/652/dc65feab31e919618d8c1041e23226ec_original.tiff?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1673737380&auto=format&frame=1&q=92&s=b22f9e32f0f2a6c2058ef5f07b35221d'


const PledgeManager=()=>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pledgesObj = useSelector(state => state.pledges.userPledges)
    const pledges = Object.values(pledgesObj);
    // const history=useHistory();
    // const pledges = Object.values(pledgesObj).filter(el=>el.backerId === sessionUser.id);
    // console.log("WHAT IS THISS", pledges)
    const history=useHistory();
    const [newSrc, setNewSrc] = useState('')

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
            <div className="pl-description">This section contains projects backed by you</div>
        {pledges.length !== 0 ?
        (pledges.map((pledge) => {
            // console.log("REWARD???", pledge.Reward)
        return (

        <div key={pledge.id} className='managebox'>
        <div className='boxitems'>
            <NavLink to={`/projects/${pledge.projectId}`} className="projectlist-links">
            <div className="projectlist-item">
                <img src={pledge.Project.imageUrl} className="projectlist-image"
                    onError={(e)=>{
                    if(e.target.src !== otherSrc) {
                    setNewSrc(otherSrc)
                    e.target.src = otherSrc
                    }
                    }}
                />
                </div>
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

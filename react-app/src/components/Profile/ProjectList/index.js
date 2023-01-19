import React from "react"
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { fetchAllProjects } from "../../../store/project";
import { fetchDeleteProject } from "../../../store/project";
import './ProjectList.css'



const ProjectManager=()=>{

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const projectsObj = useSelector(state => state.projects)
    const userprojects=Object.values(projectsObj).filter(el=>el.creatorId==sessionUser.id)
    const history=useHistory();



    useEffect(() => {
          dispatch(fetchAllProjects());
    }, [dispatch]);

    const editEvents=(id)=>{
        history.push(`/editproject/${id}`)
    }

    const rewardEvents=(id)=>{
        history.push(`/profile/${id}/rewards`)
    }

    const addRewardEvents=(id)=>{
        history.push(`/createReward/${id}`)
    }
    const deleteEvents= (id)=>{
        // const spotreviews=Object.values(spotreviewsObj).filter(review=>{return review.spotId===+id});
        // if(spotreviews.length>0){
        //     spotreviews.forEach((el)=>{
        //       dispatch(deleteReview(el.id))
        //     })
        // }
        dispatch(fetchDeleteProject(id))
    }

    if(!userprojects) return null

    return(
        <h1>
                {userprojects.map(({ id, title,category,city,state,country,fundingGoal,starDate,endDate }) => (
                <div key={id} className='managebox'>
                <div className='boxitems'>
                    <NavLink to={`/projects/${id}`} className="links">
                    <h3>{title}</h3>
                    <div>{category}</div>
                    <div className='manageaddress'>
                       <div>{`${city},${state},${country}`}</div>
                       {/* <div><i className="fas fa-star" />{avgRating}</div> */}
                    </div>
                    <div>
                       {`${fundingGoal}`}
                    </div>
                    </NavLink>
                </div>
                <div className="button-section">
                    <button onClick={()=>editEvents(id)} className="buttons"><i className="fa-regular fa-pen-to-square" />Edit</button>
                    <button onClick={()=>rewardEvents(id)} className="buttons"><i className="fa-regular fa-pen-to-square" />Project Rewards</button>
                    <button onClick={()=>addRewardEvents(id)} className="buttons"><i className="fa-regular fa-pen-to-square" />Add New Reward</button>
                    {/* <button onClick={()=>deleteEvents(id)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button> */}
                </div>
                </div>
              ))}
        </h1>
    )

}

export default ProjectManager

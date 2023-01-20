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

    if(!userprojects) return null

    return(
        <div>
                <div className="projectlist-titles">
                    <div className="projectlist-titletext">Project</div>
                    <div className="projectlist-titletext">Title</div>
                    <div className="projectlist-titletext">Category</div>
                    <div className="projectlist-titletext">Location</div>
                    <div className="projectlist-titletext">Date</div>
                    <div className="projectlist-titletext">Funding Goal</div> 
                    <div className="projectlist-titletext">More</div> 
                </div>
                {userprojects.map(({ id, title,category,city,state,country,fundingGoal,startDate,endDate,imageUrl }) => (
                <div key={id} className='managebox'>
                <div className='projectlist-boxitem'>
                    <NavLink to={`/projects/${id}`} className="projectlist-links">
                    {/* <div>{imageUrl}</div> */}
                    <div className="projectlist-item"><img src={imageUrl} className="projectlist-image"/></div>
                    <div className="projectlist-item">{title}</div>
                    <div className="projectlist-item">{category}</div>
                    <div className="projectlist-item">
                    <div>{`${city},${state},${country}`}</div>
                    </div>
                    <div className="projectlist-item">
                        <div>{`From ${startDate} to ${endDate}`}</div>
                    </div>
                    <div className="projectlist-item">{`${fundingGoal}`}</div>
                    </NavLink>
                </div>
                <div className="projectlist-buttonsec">
                    
                    <div className="project-buttop"><div onClick={()=>editEvents(id)} className="projectlist-buttons"><i className="fa-regular fa-pen-to-square" />Edit this Project</div></div>
                    <div className="project-buttop"><div onClick={()=>rewardEvents(id)} className="projectlist-buttons"><i className="fa-solid fa-list" />Project Rewards List</div></div>
                    <div className="project-buttop"><div onClick={()=>addRewardEvents(id)} className="projectlist-buttons"><i className="fa-solid fa-circle-plus" />Add New Reward</div></div>
                </div>
                </div>
              ))}
        </div>
    )

}

export default ProjectManager

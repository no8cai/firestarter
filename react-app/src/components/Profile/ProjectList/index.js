import React from "react"
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { fetchAllProjects } from "../../../store/project";
import { fetchDeleteProject } from "../../../store/project";
import './ProjectList.css'
let otherSrc = 'https://ksr-ugc.imgix.net/assets/039/670/652/dc65feab31e919618d8c1041e23226ec_original.tiff?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1673737380&auto=format&frame=1&q=92&s=b22f9e32f0f2a6c2058ef5f07b35221d'



const ProjectManager=()=>{

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const projectsObj = useSelector(state => state.projects)
    const userprojects=Object.values(projectsObj).filter(el=>el.creatorId==sessionUser.id)
    const history=useHistory();
    const [newSrc, setNewSrc] = useState('')



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
                    <div className="projectlist-item">
                        <img
                         src={imageUrl}
                         className="projectlist-image"
                         onError={(e)=>{
                            if(e.target.src !== otherSrc) {
                            setNewSrc(otherSrc)
                            e.target.src = otherSrc
                            }
                        }}
                         /></div>
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

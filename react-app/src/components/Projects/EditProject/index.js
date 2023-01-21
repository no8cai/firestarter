import React from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "../ProjectForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchProjectRewards,fetchDeleteReward } from "../../../store/reward";
import { getAllPledgesByProjectId, deletePledge } from "../../../store/pledge";
import { fetchAllProjects } from "../../../store/project";

const EditProject=()=>{

    const {projectId}=useParams();
    const dispatch = useDispatch();
     
    const tempproject = useSelector(state=>state.projects[projectId])
    const rewardsObj = useSelector(state => state.rewards)
    const pledgesObj = useSelector(state => state.pledges.pledgesById)   
    
    useEffect(() => {
      dispatch(fetchAllProjects())
      dispatch(fetchProjectRewards(projectId))
      dispatch(getAllPledgesByProjectId(projectId))
    }, [dispatch]);

    if(!tempproject || !rewardsObj || !pledgesObj) return null

    const project={
        id:tempproject.id,
        creatorId:tempproject.creatorId,
        category:tempproject.category,
        city:tempproject.city,
        state:tempproject.state,
        country:tempproject.country,
        title:tempproject.title,
        imageUrl:tempproject.imageUrl,
        fundingGoal:tempproject.fundingGoal,
        startDate:tempproject.startDate,
        endDate:tempproject.endDate,
        description:tempproject.description,
        risks:tempproject.risks,
    }

    return (
        <ProjectForm project={project} formType="Edit Project" rewardsObj={rewardsObj} pledgesObj={pledgesObj}/>
    )
}

export default EditProject

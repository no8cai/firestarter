import { fetchCreateReward } from "../../../store/reward";
import { fetchAllProjects } from '../../../store/project';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react'
import RewardForm from "../RewardForm";
import { useParams } from "react-router-dom";

const CreateReward=()=>{

    const {projectId}=useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => {return state.session.user})
    const allProjects = useSelector(state => {return state.projects})
    // console.log(user)
    // console.log(allProjects)

    const findProjectTest = async () => {
        const allProjects = await dispatch(fetchAllProjects())
      }

    useEffect(() => {
        findProjectTest()
     }, [dispatch])

     const reward={
        description:"",
        estimatedDelivery:"",
        price:0,
        title:"",
    }
     

    if (allProjects && user) {
        for (let project in allProjects) {
            // if (allProjects[project].id == projectId && allProjects[project].creatorId == user.Id) {
                return (
                    <RewardForm reward={reward} formType="Create Reward" projectId={projectId}/>
                )
            // }
        }


    }
    return (<div>This feature is not available because either you are not the creator of this project,
        this project does not exist,
        or you are logged out.
    </div>)

}
export default CreateReward
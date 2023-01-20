// import React from "react";
import React, { useEffect, useState } from 'react'
import { fetchCreateReward } from "../../../store/reward";
import { fetchAllProjects } from "../../../store/project";
import { fetchProjectRewards } from '../../../store/reward';
import RewardForm from "../RewardForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EditReward=()=>{

    const {rewardId}=useParams()
    const dispatch = useDispatch()

    const findProjectTest = async () => {
        const allProjects = await dispatch(fetchAllProjects())
        const rewardsByProject = await dispatch(fetchProjectRewards(rewardId))
      }

    useEffect(() => {
        findProjectTest()
     }, [dispatch])

    const tempReward = useSelector(state=>state.rewards[rewardId])

    if(tempReward) {
        const reward={
            id:tempReward.id,
            description:tempReward.description,
            estimatedDelivery:tempReward.estimatedDelivery,
            price:tempReward.price,
            title:tempReward.title,
        }
        return (
            <RewardForm reward={reward} formType="Edit Reward" projectId={tempReward.projectId}/>
        )
    }

    return (
        <div>The feature has not available because either you are not the creator of this reward,
            this reward does not exist,
            or you are logged out
            </div>
    )
}

export default EditReward

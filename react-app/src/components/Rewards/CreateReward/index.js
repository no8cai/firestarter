import React from "react";
import { fetchCreateReward } from "../../../store/reward";
import RewardForm from "../RewardForm";

const CreateReward=()=>{
    const reward={
        description:"",
        estimatedDelivery:"",
        price:"",
        title:"",
        title:"",
        // projectId:5
    }

    return (
        <RewardForm reward={reward} formType="Create Reward"/>
    )
}

export default CreateReward

import RewardForm from "../RewardForm";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneReward } from '../../../store/reward'
import React, { useEffect, useState } from 'react'

const EditReward = ()=>{ //not yet functional, need to first create get all Rewards
    const dispatch = useDispatch()
    const {Id}=useParams();

    const findProjectTest = async () => {
        const returnReward = await dispatch(fetchOneReward(Id))
      }

    useEffect(() => {
        findProjectTest()
     }, [dispatch])

    const tempReward = useSelector(state=>state.rewards)
    if(tempReward[Id]) {
        const reward={
            id:tempReward[Id].id,
            estimatedDelivery:tempReward[Id].estimatedDelivery,
            description:tempReward[Id].description,
            price: tempReward[Id].price,
            title:tempReward[Id].title,
        }
        return (
            <RewardForm reward={reward} formType="Edit Reward"/>
        )
    }
    return (null)
}

export default EditReward

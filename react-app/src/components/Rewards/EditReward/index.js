import RewardForm from "../RewardForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { getProjectRewards }

const EditReward = ()=>{ //not yet functional, need to first create get all Rewards

    const {rewardId}=useParams();
    console.log('does reward Id work', rewardId)
    const tempReward = useSelector(state=>state.rewards[rewardId])
    console.log('what about tempReward', tempReward)

    const reward={
        id:tempReward.rewardId,
        estimatedDelivery:tempReward.estimatedDelivery,
        description:tempReward.description,
        price: tempReward.price,
        title:tempReward.title,
    }

    return (
        <RewardForm reward={reward} formType="Edit Reward"/>
    )
}

export default EditReward

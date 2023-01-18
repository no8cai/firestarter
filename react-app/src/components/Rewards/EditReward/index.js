import { fetchCreateReward } from "../../../store/reward";
import RewardForm from "../RewardForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditReward=()=>{

    const {rewardId}=useParams()
    
    const tempReward = useSelector(state=>state.rewards[rewardId])

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

export default EditReward

import { fetchCreateReward } from "../../../store/reward";
import RewardForm from "../RewardForm";
import { useParams } from "react-router-dom";

const CreateReward=()=>{

    const {projectId}=useParams()
    const reward={
        description:"",
        estimatedDelivery:"",
        price:"",
        title:"",

    }

    return (
        <RewardForm reward={reward} formType="Create Reward" projectId={projectId}/>
    )
}

export default CreateReward

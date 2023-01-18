import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { fetchProjectRewards } from "../../../store/reward";
import { useParams } from "react-router-dom";
import { fetchDeleteReward } from "../../../store/reward";

const RewardManager=()=>{

    const dispatch = useDispatch();
    const {projectId}=useParams();
    
    const rewardsObj = useSelector(state => state.rewards)
    const rewards = Object.values(rewardsObj).filter(el=>el.projectId==projectId)
    const history=useHistory(); 
    console.log(projectId)

    useEffect(() => {
        dispatch(fetchProjectRewards(projectId));
    }, [dispatch]); 

    const editEvents=(id)=>{
        history.push(`/editReward/${id}`)
    }
    const deleteEvents=(id)=>{
        dispatch(fetchDeleteReward(id))
    }

    return(
        <h1>
        {rewards.map(({id,title,price,description,estimatedDelivery }) => (
        <div key={id} className='managebox'>
        <div className='boxitems'>
            <NavLink to={`/`} className="links">
            <h3>{title}</h3>
            <div>{price}</div>
            <div>{description}</div>
            <div>{estimatedDelivery}</div>
            <div className='manageaddress'>
               {/* <div>{`${city},${state},${country}`}</div> */}
               {/* <div><i className="fas fa-star" />{avgRating}</div> */}
            </div>
            <div>
               {/* {`${fundingGoal}`} */}
            </div>
            </NavLink>
        </div>
        <div className="button-section">
            {/* <button className="buttons"><i className="fa-regular fa-pen-to-square" />Edit</button>
            <button className='buttons'><i className="fa-solid fa-trash-can" />Delete</button> */}
            <button onClick={()=>editEvents(id)} className="buttons"><i className="fa-regular fa-pen-to-square" />Edit</button>
            <button onClick={()=>deleteEvents(id)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button>
        </div>
        </div>
      ))}
</h1>
    )
}

export default RewardManager
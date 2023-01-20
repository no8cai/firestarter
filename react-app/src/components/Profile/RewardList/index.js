import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory, Link } from "react-router-dom";
import { fetchProjectRewards } from "../../../store/reward";
import { useParams } from "react-router-dom";
import { fetchDeleteReward } from "../../../store/reward";
import { fetchAllProjects } from '../../../store/project';

const RewardManager=()=>{

    const dispatch = useDispatch();
    const {projectId}=useParams();
    const findProjectTest = async () => {
        const allProjects = await dispatch(fetchAllProjects())
      }
    useEffect(() => {
        findProjectTest()
    }, [dispatch])
const allProjects = useSelector(state => {return state.projects})
    const rewardsObj = useSelector(state => state.rewards)
    const rewards = Object.values(rewardsObj).filter(el=>el.projectId==projectId)
    const userId = useSelector(state => {return state.session.user.id})
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

    const rewardEvents=(id)=>{
        history.push(`/profile/${id}/rewards`)
    }
    //first use select for allProjects, user, allRewards
    if (allProjects && rewards && userId) {
        //1 user logged in - check user id - should automatically send to main page
         //2 project id is real - check project id
         let allProjectsArray = Object.values(allProjects)

        let booleanProjects = allProjectsArray.find(project => project.id == projectId)
        if (!booleanProjects) {
            return (<div>This project doesn't exist. Would you like to create a project?
                <Link className="create-project-link" to={`/createproject`}>
                  <div>Create Project</div>
                  </Link>
            </div>)
        }
        console.log('does this work', booleanProjects.creatorId, userId)


        //4 reward of project exists - check length of project array
        if(!rewards.length) {
            return (<div>This project doesn't have any rewards yet. Would you like to create a reward for your project?
                <button onClick={()=>rewardEvents(rewards.id)} className="buttons"><i className="fa-regular fa-pen-to-square" />Project Rewards</button>
            </div>)
        }
          //3 compare user id to project creator id - check owner of project

          if(userId != booleanProjects.creatorId) {
            return (<div>You don't own this or you are not logged in. Would you like to create a project?
                 <Link className="create-project-link" to={`/createproject`}>
                  <div>Create Project</div>
                  </Link>

            </div>)
        }





    }



    return(
        <h1>
        {rewards.length ? (rewards.map(({id,title,price,description,estimatedDelivery }) => (
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
      ))): (<div className="reward-form-container">
            <div>
                This project has no rewards yet. Add a reward (Button here)
            </div>
      </div>)}
</h1>
    )
}

export default RewardManager

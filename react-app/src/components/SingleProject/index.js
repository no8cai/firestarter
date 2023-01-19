import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import './SingleProject.css'
import React, { useEffect, useState } from 'react'
import { fetchOneProject } from '../../store/project'
import { fetchProjectRewards } from '../../store/reward'
import { getAllPledgesByProjectId} from '../../store/pledge'
import { getAllPledges } from '../../store/pledge';
import {fetchDeleteReward} from '../../store/reward'


const SingleProject = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const history = useHistory()


  const findProjectTest = async () => {
    const returnProject = await dispatch(fetchOneProject(id))
    const allPledgeByProject = await dispatch(getAllPledgesByProjectId(id))
  }

  useEffect(() => {
    findProjectTest()
 }, [dispatch])

   const addPledgesEvents=(project_Id)=>{
        //   history.push(`/projects/${project_Id}/createpledges`)
        history.push(`/projects/${project_Id}/createpledges`)
   }


   let oneProject = useSelector(state => {return state.projects[id]})
   if(oneProject) {
    var date1 = new Date(oneProject.startDate);
    var date2 = new Date(oneProject.endDate);
    var diffTime = Math.abs(date2 - date1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   }

    const allPledges = useSelector(state => state.pledges)
    let allPledgesArray = []
    let totalPledges = 0
    if(allPledges.pledgesById) {
        allPledgesArray = Object.values(allPledges.pledgesById)
        allPledgesArray.forEach(pledge => {
            totalPledges += parseFloat(pledge.Reward.price)})
    } else {
        return null
    }
    const tempDeleteRewardId = 6
    const handleRemoveReward = (rewardId) => {
        console.log('for delete do we have rewardId', rewardId)
        dispatch(fetchDeleteReward(rewardId))
    }

  if (oneProject && allPledgesArray) { //
    let currentProgress = ((totalPledges * 100)/(oneProject.fundingGoal)).toFixed(2)
    return (
        <div className='sp-extra-outer-div'>
        <div className='sp-whole-page'>
    <div className="sp-title sp-add-border">
        <h1>{oneProject.title}</h1>
        <h4>By {oneProject.creator.username}</h4>
        <button className='sp-delete-reward'onClick={()=> {handleRemoveReward(tempDeleteRewardId)}}>Temporary location of delete reward button </button>
    </div>
    <div className="sp-main-content add-border">
        <div className="sp-left-side-media add-border">
            <div className="sp-media-img">
                <img src={oneProject.imageUrl} alt="Project Image"/>
            </div>
            <div className='sp-location'>
            <i className ="fa-solid fa-fire"></i>&nbsp;Project We Love&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa-regular fa-compass"></i> {oneProject.category}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa-sharp fa-solid fa-location-dot"></i>   {oneProject.city}, {oneProject.state}, {oneProject.country}
            </div>
        </div>

        <div className="sp-right-side sp-add-border">
            <div className="sp-add-border sp-bar-back" role='progressbar'
            >
                <div className='sp-green-bar' style={{width: `${currentProgress}%`}}></div>
            </div>
            <div className="sp-add-border sp-basic-budget">
                <h2 className='sp-green'>${totalPledges}</h2>
                <p>pledged of ${Math.floor(oneProject.fundingGoal)} goal</p>
                <h2>{allPledgesArray.length} </h2>
                <p>backers </p>
                <h2>{diffDays} </h2>
                <p>days to go</p>
            </div>
            <div className="sp-add-border sp-right-side-buttons">
                <button onClick={()=>addPledgesEvents(id)} className='sp-green-button'>Back this project</button>
                <br/>
                <button className='sp-remind-me'><i className="fa-regular fa-bookmark"></i> Remind me</button>
                <p>All or nothing. This project will only be funded
                    if it reaches its goal by {date2.toDateString()}.</p>
            </div>
        </div>
    </div>
    <div className="sp-add-border sp-about-kickstarter">
        <div><i className="fa-solid fa-people-arrows sp-center-icon"></i><p>Fire Starter connects creators with backers to fund projects.</p> </div>
        <div><i className="fa-regular fa-comments sp-center-icon"></i><p>Rewards aren't guaranteed, but creators must regularly update backers.</p> </div>
        <div><i className="fa-solid fa-bullhorn sp-center-icon"></i><p>You're only charged if the project meets its funding goal by the campaign deadline.</p> </div>
    </div>
    <div className='sp-add-border sp-outer-bottom-bar'>
    <div className="sp-add-border sp-bottom-bar">
        <button>Campaign</button>
        <button>Updates</button>
        <button>Comments</button>
    </div>
    </div>
    <div className="sp-add-border sp-bottom-section">
        <div className="sp-bottom-left">
            <h4 className='sp-story'>Story</h4>
            <h4>Risks</h4>
        </div>
        <div className="sp-add-border sp-bottom-center">
            <div className="sp-story">
                <h4>Story</h4>
                <p>{oneProject.description}</p>
            </div>
            <div className="sp-risks">
                <h4>Risks</h4>
                <p>{oneProject.risks}</p>
            </div>

        </div>
        <div className="sp-add-border sp-bottom-right">

            <div>About the creator: {oneProject.creator.username}</div>
            <div>Support</div>
            <div>Pledge without reward</div>
            <div>Pledge $10</div>
        </div>
    </div>

</div>
</div>
    )
  } else {
    return(
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            "something didn't work"
        </div>

    )

  }

}


export default SingleProject

import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import './SingleProject.css'
import React, { useEffect, useState } from 'react'
import ProfileButton from '../Navigation/ProfileButton';
import { fetchOneProject } from '../../store/project'
import { fetchProjectRewards } from '../../store/reward'
import { getAllPledgesByProjectId} from '../../store/pledge'
import { getAllPledges } from '../../store/pledge';
import {fetchDeleteReward} from '../../store/reward'
import { fetchAllProjects } from '../../store/project';
import { getPledgesByCurrentUser,  } from '../../store/pledge'
let otherSrc = 'https://ksr-ugc.imgix.net/assets/039/670/652/dc65feab31e919618d8c1041e23226ec_original.tiff?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1673737380&auto=format&frame=1&q=92&s=b22f9e32f0f2a6c2058ef5f07b35221d'



const SingleProject = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const history = useHistory()
    const [newSrc, setNewSrc] = useState('')
    const sessionUser = useSelector(state => state.session.user);

  const findProjectTest = async () => {
    const returnProject = await dispatch(fetchOneProject(id))
    const allPledgeByProject = await dispatch(getAllPledgesByProjectId(id))
    const allProjects = await dispatch(fetchAllProjects())
    const allPledgesReturn = await dispatch(getAllPledges())
  }

  useEffect(() => {
    findProjectTest()
 }, [dispatch])

   const addPledgesEvents=(project_Id)=>{
        history.push(`/projects/${project_Id}/createpledges`)
   }
   const editPledgesEvents=(project_Id, pledge_id)=>{
        history.push(`/projects/${project_Id}/editpledge/${pledge_id}`)

   }
   let oneProject = useSelector(state => {return state.projects[id]})
   const allProjects = useSelector(state => {return state.projects})
   const allPledges = useSelector(state => state.pledges.allPledges)
   const allPledgesByProjectId = useSelector(state => { return state.pledges.pledgesById})
   //console.log("allPledgesByProjectId", allPledgesByProjectId)

   let usersPledge = ''
   let allPledgesByCurrentUser = ''
   if (allPledges && sessionUser) {
    let newTestTing = Object.values(allPledges)
    // console.log('OBJECT VERSION', allPledges)
    // console.log('ARRAY VERSION', newTestTing)
    //console.log('sessionUserId should be 7', sessionUser.id, 'this should be be an array of all pledges with projectids in order', Object.values(allPledges))
    allPledgesByCurrentUser = (Object.values(allPledges)).filter(pledge => pledge.backerId === sessionUser.id)
    //console.log('allPledgesByCurrentUser should be 1 for projectId 1', allPledgesByCurrentUser)
    usersPledge = allPledgesByCurrentUser.find(pledge => pledge.projectId == id)
    //console.log('usersPledge', usersPledge)


   }

   let allPledgesByCreator = ''
   let totalProjectsOfThisProjectsCreator = 0
  if (allPledges && oneProject) {
    allPledgesByCreator = (Object.values(allPledges)).filter(pledge => pledge.backerId === oneProject.creatorId )
  }


   if(allProjects && oneProject && allPledges ) {
    let arrayOfProjects = Object.values(allProjects)
    for (let i=0; i < arrayOfProjects.length; i+= 1 ) {
        if (arrayOfProjects[i].creatorId ==  oneProject.creatorId) {
            totalProjectsOfThisProjectsCreator += 1
        }
    }
   }

   if(oneProject) {
    var date1 = new Date(oneProject.startDate);
    var date2 = new Date(oneProject.endDate);
    var diffTime = Math.abs(date2 - date1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   }

    let allPledgesByProjectIdArray = []
    let totalPledges = 0
    if(allPledgesByProjectId) {
        //console.log('what is allPledgesByProjectId', allPledgesByProjectId)
        allPledgesByProjectIdArray = Object.values(allPledgesByProjectId)
        allPledgesByProjectIdArray.forEach(pledge => {
            totalPledges += parseFloat(pledge.Reward.price)})
    } else {
        return null
    }

  if (oneProject && allPledgesByProjectId && allProjects && allPledges) { //
    let currentProgress = ((totalPledges * 100)/(oneProject.fundingGoal)).toFixed(2)
    //console.log('allPledgesByCreator',allPledgesByCreator, 'allPledges', allPledges )

    const buttonsOptions3 = () => {
        if(sessionUser && usersPledge) {
            return (
                <button onClick={()=>editPledgesEvents(id, usersPledge.id)} className='sp-green-button'>Edit your pledge</button>
            )
        } else if (sessionUser) {
            return (
                <button onClick={()=>addPledgesEvents(id)} className='sp-green-button'>Back this project</button>
            )
        } else { return (
            <div className='sp-log-in-to-back'>
            <p>Log in to back this project &nbsp;
                &nbsp;</p>
            <ProfileButton user={sessionUser} />
           </div>
        )
        }
    }
    return (
        <div className='sp-extra-outer-div'>
        <div className='sp-whole-page'>
    <div className="sp-title sp-add-border">
        <h1 className="oneProject-title">{oneProject.title}</h1>
        <h4>By {oneProject.creator.username}</h4>

    </div>
    <div className="sp-main-content add-border">
        <div className="sp-left-side-media add-border">
            <div className="sp-media-img">
                <img src={oneProject.imageUrl}
                alt="Project Image"
                onError={(e)=>{
                    if(e.target.src !== otherSrc) {
                    setNewSrc(otherSrc)
                    e.target.src = otherSrc
                    }
                }}
                />
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
                <h2>{allPledgesByProjectIdArray.length} </h2>
                <p>backers </p>
                <h2>{diffDays} </h2>
                <p>days to go</p>
                {sessionUser && usersPledge &&
                    <div>Thank you for your pledge with the reward of "{usersPledge.Reward.title}".</div>
                }
            </div>
            <div className="sp-add-border sp-right-side-buttons">
            {buttonsOptions3()}

                <br/>
                <button id="do-not-interact" title="Feature coming soon!" className='sp-remind-me'><i className="fa-regular fa-bookmark"></i> Remind me</button>
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
        <button >Campaign</button>
        <button id="do-not-interact" title="Feature coming soon!">Updates</button>
        <button id="do-not-interact" title="Feature coming soon!">Comments</button>
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
                <p className='sp-css-fix'> {oneProject.description}</p>
            </div>
            <div className="sp-risks">
                <h4>Risks</h4>
                <p>{oneProject.risks}</p>
            </div>

        </div>
        <div>

        </div>
        <div className="sp-add-border sp-bottom-right">
            <div className='sp-outer-profile-photo'>
            <img className='sp-profile-photo' src={'https://ksr-ugc.imgix.net/assets/039/344/204/8bee49558eb7cf83017f35b941be7143_original.png?ixlib=rb-4.0.2&crop=faces&w=352&h=198&fit=crop&v=1669689332&auto=format&frame=1&q=92&s=d237fbbd7f761943309c1523d40c0527'} alt="Profile Image"/>
            </div>

            <div className='sp-right-box'>
            <br/>
            <br/>
            <div>{oneProject.creator.username}</div>
            <div>{totalProjectsOfThisProjectsCreator} created · {Object.values(allPledgesByCreator).length} backed </div>
            <br/>
            <div>{oneProject.creator.username} is a frequent contributor Fire Starter and has lead a variety of successful projects.</div>
            </div>

        </div>
    </div>

</div>
</div>
    )
  } else {
    return(  <div className='sp-broken'>This page was not able to load</div> )

  }

}


export default SingleProject

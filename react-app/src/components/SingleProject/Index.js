import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import './SingleProject.css'
import { useEffect, useState } from 'react'
import { getOneProject } from '../../store/project'
// import { getAllPledgesByProjectId} from '../../store/pledge'


const SingleProject = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const history = useHistory()


  const findProjectTest = async () => {


    const returnProject = await dispatch(getOneProject(id))
    console.log("the returnProject is undefined", returnProject, 'the id is', id)
    // if(!returnProject) { //having that in there broke it
    //   history.push('/page-not-found')
    // }
  }

  useEffect(() => {
    findProjectTest()
 }, [dispatch])

   let oneProject = useSelector(state => {return state.projects[id]})
  console.log('is the useSelector working', oneProject)

 const currentUserId = useSelector(state=>{
    if(state.session.user) {return state.session.user.id}
    else {return ''}
  })

  if (oneProject) {
    return (
        <div>
    <div class="nav add-border">
        <div class="left-nav">
            <button>Discover</button>
             <button>Start a project</button>
        </div>
        <div class="center-nav">
            <button>KICKSTARTER</button>
        </div>

        <div class="'right-nav">
            <button>Search</button>
            <div>logo</div>
             <button>login</button>
             <div>logo</div>
        </div>


    </div>
    <div class="title add-border">
        <h3>Title: {oneProject.title}</h3>
        {/* <h4>Subtitle: A book to empower the girls we love</h4> */}
    </div>
    <div class="main-content add-border">
        <div class="left-side-media add-border">
            <div class="media-img">
                <img src="https://ksr-ugc.imgix.net/assets/039/344/204/8bee49558eb7cf83017f35b941be7143_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669689332&auto=format&frame=1&q=92&s=999555cf6d5ead17ea4d17cb90839449" alt="Project Image"/>
            </div>
            <div>
                category: {oneProject.category} <br/>
                location: {oneProject.city}, {oneProject.state}, {oneProject.country}
            </div>
        </div>

        <div class="right-side add-border">
            <div class="add-border">
                -------bar for funding of the project--------
            </div>
            <div class="add-border basic-budget">
                <h4>$4189 pledged of ${oneProject.fundingGoal} goal</h4>
                <h4>88 backers</h4>
                <h4>8 days to go</h4>
            </div>
            <div class="add-border right-side-buttons">
                <button>Back this project</button>
                <button>Remind me</button>
                <p>All or nothing. This project will only be funded
                    if it reaches its goal by {oneProject.endDate}.</p>
            </div>

        </div>

    </div>
    <div class="add-border about-kickstarter">
        <div> Kickstarter connects creators with backers to fund projects.</div>
        <div> Rewards aren't guaranteed, but creators must regularly update backers.</div>
        <div> You're only charged if the project meets its funding goal by the campaign deadline.</div>
    </div>
    <div class="add-border bottom-bar">
        <button>Campaign</button>
        <button>Updates</button>
        <button>Comments</button>
    </div>
    <div class="add-border bottom-section">
        <div class="bottom-left">
            <h4>Story</h4>
            <div>----</div>
            <h4>Risks</h4>
        </div>
        <div class="add-border bottom-center">
            <div class="story">
                <h4>Story</h4>
                <p>{oneProject.description}</p>
                {/* Sweet Fire is a children's book that inspires girls to live full and free. The goal of this Kickstarter campaign is to print 500 hardcover copies of the Sweet Fire  and to get them into the hands of children who need this message.  Additional items such as the accompanying song and custom stickers  are also part of the project's goals.
        The author has financed the illustrations, promotion and initial book design.  Now the Kickstarter community can help take the project over the finished line to a finished, industry-quality publishing product! */}

            </div>
            <div class="risks">
                <h4>Risks</h4>
                <p>{oneProject.risks}</p>
                {/* The central risk with this campaign is not meeting the funding goal. If the funding goal is not reached, unfortunately no one receives their rewards.
        We are working with a reputable and reliable U.S. printer and the books are on track for completion at the end of this campaign. The one risk to all of publishing that we cannot control is the supply chain issues created by COVID. The risk associated with this would be a delay in shipping. This should be unlikely, however, since margin has been built into the schedule to hopefully allow for this. */}
            </div>

        </div>
        <div class="add-border bottom-right">
            <div>About the creator: {oneProject.creator.username}</div>
            <div>Support</div>
            <div>Pledge without reward</div>
            <div>Pledge $10</div>
        </div>
    </div>

</div>
    )
  } else {
    return "something didn't work"

  }

}


export default SingleProject

import React from 'react';
import './HomePage.css'
import { useDispatch, useSelector} from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { fetchAllProjects, fetchOneProject } from '../../store/project';
import { useEffect, useState } from 'react'
import { getAllPledges, getAllPledgesByProjectId, getPledgesByCurrentUser } from '../../store/pledge';
import SearchResultPage from '../Search';
import background from '../../../src/images/kstrtrbg.png'


function Landing() {
    const dispatch = useDispatch()

    const projectsObj = useSelector(state => state.projects)
    const projects = Object.values(projectsObj)
    // const randId
    const [ randId, setRandId ] = useState(Math.floor(Math.random() * (projects.length) + 1))
    console.log('randId',randId)
    const pledgesObj = useSelector(state => state.pledges.allPledges)
        const pledges = Object.values(pledgesObj)
        
    useEffect(() => {
        dispatch(fetchAllProjects())
        dispatch(fetchOneProject(randId))
        dispatch(getAllPledges())
    }, [dispatch])
    
    
    // console.log("all pledges", pledgesObj)


    let totalPledges = 0
    if (pledgesObj){
        pledges.forEach(pledge => {
            totalPledges += parseFloat(pledge.Reward.price)
        })
    }
    
    // console.log(projects)
    const randProject = useSelector(state => state.projects[randId])
    // console.log("AAAAAAAAA", randProject)

    
    let pledgeTotal = 0
    // let randPledges = pledges.filter(pledge => pledge.projectId === randId)
    // randPledges.forEach(pledge => {
    //     pledgeTotal += parseFloat(pledge.Reward.price)
    // })
    let currentProgress 
    // if (randProject !== undefined){
    //     currentProgress = ((pledgeTotal * 100)/(randProject.fundingGoal)).toFixed(2)
    // }
    
    
    
    // console.log(currentProgress, pledgeTotal, randProject.fundingGoal)
    
    
    if (!projectsObj || !randProject || !pledgesObj ) return null


    return (
        <div className="main-container" style={{ backgroundImage: `url('${background}'`, backgroundRepeat  : 'no-repeat', backgroundSize: 'fit',
        width: '100%' }}>
    <div className="categories-bar">
        <span>
          <Link to="/discover/arts">Arts</Link>
        </span>
        <span>
          <Link to="/discover/comics&illustration">Comics & Illustration</Link>
        </span>
        <span>
          <Link to="/discover/design&tech">Design & Tech</Link>
        </span>
        <span>
          <Link to="/discover/film">Film</Link>
        </span>
        <span>
          <Link to="/discover/food&craft">Food & Craft</Link>
        </span>
        <span>
          <Link to="/discover/games">Games</Link>
        </span>
        <span>
          <Link to="/discover/music">Music</Link>
        </span>
        <span>
          <Link to="/discover/publishing">Publishing</Link>
        </span>
      </div>

    <div className="content-container">
        <div className="headline-holder">
            <h1 className="headline">Bring a creative project to life.</h1>
            <p className="subtext">ON FIRESTARTER:</p>
        </div>

        <div className="numbers-holder">
            <div className="numbers-box">
                <span className="nums-text">{projects.length}</span>
                <span className="subtext">projects</span>
            </div>
            <div className="numbers-box">
                <span className="nums-text">${totalPledges}</span>
                <span className="subtext">towards creative work</span>
            </div>
            <div className="numbers-box">
                <span className="nums-text">{pledges.length}</span>
                <span className="subtext">pledges</span>
            </div>
        </div>
    </div>

    <div className="content-container">
        <div className="content-container-row">
            <div className="feature-project-holder">
                <span className="home-section-title">FEATURE PROJECT</span>
                <Link className="feature-link" to={`/projects/${randProject.id}`}>
                    <div className="feature-image"><img className='img' src={randProject.imageUrl}></img></div>
                    <div className="sp-add-border sp-bar-back" role='progressbar'>
                    <div className='sp-green-bar' style={{width: `${currentProgress}%`}}></div>
                    </div>
                <div className="feature-title">{randProject.title}</div>
                <div className="feature-description"><span className="descr-text">{randProject.description}</span></div>
                <div className="feature-creator">by {randProject.creator.username}</div>
                </Link>

            </div>
            <div className="rec-holder">
                <span className="home-section-title">RECOMMENDED FOR YOU</span>
                    {projects.length && (projects.slice(0).reverse().slice(0, 3).map(project => {
                        let pledgeTotal = 0
                        let counter = 0
                        pledges.forEach(pledge => {
                            if (project.id == pledge.Project.id){
                                pledgeTotal += parseInt(pledge.Reward.price)
                                counter++
                            }
                        })
                        return (
                <div key={project.id} className="rec-projects">
                    <Link to={`/projects/${project.id}`}>

                    <div className="rec-project-thumbnail"><img className='img' src={project.imageUrl}></img></div>
                    <div className="rec-project-details">
                        <span className="rec-project-title">{project.title}</span>
                        <span className="rec-project-funded">{counter !== 0 ? Math.ceil(((pledgeTotal)/project.fundingGoal)*100) : 0}% funded</span>
                        <span className="rec-project-creator">By {project.creator.username}</span>
                        <div className="rec-project-bookmark-likes">
                        <i className="fa-regular fa-bookmark"></i> <i className="fa-regular fa-thumbs-up"></i> <i className="fa-regular fa-thumbs-down"></i></div>
                    </div>
                        </Link>
                </div>
                        )
                    }))}
            </div>
        </div>
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        
    </div>

    <div className="line-break"></div>

    <div className='content-container'>

    <div className="content-container-row2">
        <div className="home-section-title">DEVS</div>
        <div className="devbox1"></div>
     </div>
        <div className="devbox">
            <div className='each-dev'>
                    <div className="dev-img-holder"></div>
                    <div>Dev 1</div>
            </div>
            <div className='each-dev'>
                <div className="dev-img-holder"></div>
                <div>Dev A</div>
            </div>
            <div className='each-dev'>
                <div className="dev-img-holder"></div>
                <div>Dev α</div>
            </div>
            <div className='each-dev'>
                <div className="dev-img-holder"></div>
                <div>Dev 👍</div>
            </div>
        </div>
    </div>


    {/* <div className="line-break"></div>

    <div className="content-container">
        Project Updates? section
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        Hot Off The Press section - looks like website news?
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        Taking off section
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        Etc....
    </div> */}


    </div>
    )
}

export default Landing;

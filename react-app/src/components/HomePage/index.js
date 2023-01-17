import './HomePage.css'
import { useDispatch, useSelector} from 'react-redux';
import { fetchAllProjects, fetchOneProject } from '../../store/project';
import { useEffect, useState } from 'react'
import { getAllPledges, getAllPledgesByProjectId } from '../../store/pledge';
import { fetchProjectRewards } from '../../store/reward';


function Landing() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchAllProjects())
        dispatch(fetchOneProject())
        dispatch(getAllPledges())
    }, [dispatch])

    const pledgesObj = useSelector(state => state.pledges)
    const pledges = Object.values(pledgesObj)
    let totalPledges = 0
    if (pledgesObj){
        pledges.forEach(pledge => {
            totalPledges += parseFloat(pledge.Reward.price)
        })
    }
    
    const projectsObj = useSelector(state => state.projects)
    const projects = Object.values(projectsObj)
    let randId = Math.floor(Math.random() * (projects.length) + 1)
    const randProject = useSelector(state => state.projects[randId])


    if (!projectsObj || !randProject || !pledgesObj) return null


    return (
        <div className="main-container">
    <div className="categories-bar">
        <span>Arts</span>
        <span>Comics & Illustration</span>
        <span>Design & Tech</span>
        <span>Film</span>
        <span>Food & Craft</span>
        <span>Games</span>
        <span>Music</span>
        <span>Publishing</span>
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
                <span className="nums-text">${totalPledges}.00</span>
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
                <div className="feature-image"><img className='img' src={randProject.imageUrl}></img></div>
                <div className="feature-title">{randProject.title}</div>
                <div className="feature description">{randProject.description}</div>
                <div className="feature-creator">by {randProject.creator.username}</div>
            </div>
            <div className="rec-holder">
                <span className="home-section-title">RECOMMENDED FOR YOU</span>
                {/* for project in projects loop */}
                    {projects.length && (projects.slice(0).reverse().map(project => {
                        return (
                <div className="rec-projects">

                    <div className="rec-project-thumbnail"><img className='img' src={project.imageUrl}></img></div>
                    <div className="rec-project-details">
                        <span className="rec-project-title">{project.title}</span>
                        <span className="rec-project-funded">100% funded</span>
                        <span className="rec-project-creator">By {project.creator.username}</span>
                        <div className="rec-project-bookmark-likes">Bookmark, like, dislike buttons</div>
                    </div>
                </div>
                        )
                    }))}
            </div>
        </div>
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        Small project section
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
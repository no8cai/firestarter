import './HomePage.css'
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProjects, fetchOneProject } from '../../store/project';
import { useEffect, useState } from 'react'
import { getAllPledges, getAllPledgesByProjectId, getPledgesByCurrentUser } from '../../store/pledge';
// import { fetchProjectRewards } from '../../store/reward';
// import SearchResultPage from '../Search';


function Landing() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchAllProjects())
        dispatch(fetchOneProject())
        dispatch(getAllPledges())
        // dispatch(getPledgesByCurrentUser())
    }, [dispatch])

    const pledgesObj = useSelector(state => state.pledges.allPledges)
    const pledges = Object.values(pledgesObj)
    // console.log(pledges)
    let totalPledges = 0
    if (pledgesObj){
        pledges.forEach(pledge => {
            // console.log("PLEDGE", pledge)
            totalPledges += parseFloat(pledge.Reward.price)
        })
    }
    
    const projectsObj = useSelector(state => state.projects)
    const projects = Object.values(projectsObj)
    // console.log(projects)
    let randId = Math.floor(Math.random() * (projects.length) + 1)
    const randProject = useSelector(state => state.projects[randId])
    let pledgeTotal = 0

    if (!projectsObj || !randProject || !pledgesObj || pledges.length == 0) return null


    return (
        <div className="main-container">
    <div className="categories-bar">
        <span><Link to="/discover/arts" cat='art'>Arts</Link></span>
        <span><Link to="/discover/comicsillustration" cat='comicsillustration'>Comics & Illustration</Link></span>
        <span><Link to="/discover/designtech">Design & Tech</Link></span>
        <span><Link to="/discover/film">Film</Link></span>
        <span><Link to="/discover/foodcraft">Food & Craft</Link></span>
        <span><Link to="/discover/games">Games</Link></span>
        <span><Link to="/discover/music">Music</Link></span>
        <span><Link to="/discover/publishing">Publishing</Link></span>
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
                <Link className="feature-link" to={`/projects/${randProject.id}`}>
                    <div className="feature-image"><img className='img' src={randProject.imageUrl}></img></div>
                <div className="feature-title">{randProject.title}</div>
                <div className="feature description">{randProject.description}</div>
                <div className="feature-creator">by {randProject.creator.username}</div>
                </Link>
                
            </div>
            <div className="rec-holder">
                <span className="home-section-title">RECOMMENDED FOR YOU</span>
                {/* for project in projects loop */}
                    {projects.length && (projects.slice(0).reverse().map(project => {
                        // console.log(pledges[project.id - 1])
                        if (pledges.length) pledgeTotal += pledges[project.id - 1].Reward.price
                        console.log(pledges)
                        return (
                <div key={project.id} className="rec-projects">
                    <Link to={`/projects/${project.id}`}>

                    <div className="rec-project-thumbnail"><img className='img' src={project.imageUrl}></img></div>
                    <div className="rec-project-details">
                        <span className="rec-project-title">{project.title}</span>
                        <span className="rec-project-funded">{pledges.length ? (pledgeTotal * 100)/project.fundingGoal : 0}% funded</span>
                        <span className="rec-project-creator">By {project.creator.username}</span>
                        <div className="rec-project-bookmark-likes">Bookmark, like, dislike buttons</div>
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
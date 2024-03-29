import React from 'react';
import './HomePage.css'
import { useDispatch, useSelector} from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { fetchAllProjects, fetchOneProject } from '../../store/project';
import { useEffect, useState } from 'react'
import { getAllPledges, getAllPledgesByProjectId, getPledgesByCurrentUser } from '../../store/pledge';
import SearchResultPage from '../Search';
import background from '../../../src/images/kstrtrbg.png'
let otherSrc = 'https://ksr-ugc.imgix.net/assets/039/670/652/dc65feab31e919618d8c1041e23226ec_original.tiff?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1673737380&auto=format&frame=1&q=92&s=b22f9e32f0f2a6c2058ef5f07b35221d'


function Landing() {
    const dispatch = useDispatch()
    const [newSrc, setNewSrc] = useState('')

    const projectsObj = useSelector(state => state.projects)
    const projects = Object.values(projectsObj)
    // const randId
    const [ randId, setRandId ] = useState(Math.floor(Math.random() * (projects.length) + 1))
    // console.log('randId',randId)
    const loadPledges = useSelector(state => state.pledges)
    // console.log(loadPledges.totalPledgeNum)
    // const totalPledgeNum = loadPledges.totalPledgeNum
    // const totalPledgeNum = useSelector(state => state.pledges.totalPledgeNum)
    // console.log(totalPledgeNum)
    // const pledgesObj = useSelector(state => state.pledges.allPledges)
    const pledges = Object.values(loadPledges.allPledges)
    const randProject = useSelector(state => state.projects[randId])

    useEffect(() => {
        dispatch(fetchAllProjects())
        dispatch(fetchOneProject(randId))
        dispatch(getAllPledges())
    }, [dispatch])

    // if (!projectsObj || !randProject || !pledgesObj || !loadPledges ) return null
    // let allTotalPledges = 0
    // if(pledgesObj){
    //     pledges.forEach(pledge => {
    //         allTotalPledges += parseInt(pledge.Reward.price)
    //     })
    // }

    // let totalPledges = 0
    // if (pledgesObj){
    //     pledges.forEach(pledge => {
    //         if (randId === pledge.Project.id){
    //         totalPledges += parseInt(pledge.Reward.price)
    //         }
    //     })
    // }

    // console.log(projects)
    
    // console.log("AAAAAAAAA", randProject)


    
    // let randPledges = pledges.filter(pledge => pledge.projectId === randId)
    // randPledges.forEach(pledge => {
    //     pledgeTotal += parseFloat(pledge.Reward.price)
    // })
    // if (!projectsObj || !randProject || !loadPledges || ! pledgesObj ) return null
    if (!projectsObj || !randProject || !loadPledges ) return null

    let currentProgress
    if (randProject !== undefined && loadPledges){
        currentProgress = ((loadPledges.totalPledges * 100)/(randProject.fundingGoal)).toFixed(2)
    }
    function numbertrate(num){
        let numstr=num.toString().split("").reverse()
        let newstr=[]
        for(let i=0;i<numstr.length;i++){
           newstr.push(numstr[i])
           if((i+1)%3==0&&i!==numstr.length-1){
             newstr.push(",")
           }
        }
        return newstr.reverse().join("")
     }


    return (
      <div
        className="main-container"
        style={{
          backgroundImage: `url('${background}'`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          width: "100%",
        }}
      >
        <div className="categories-bar">
          <span>
            <Link to="/discover/arts">Arts</Link>
          </span>
          <span>
            <Link to="/discover/comics&illustration">
              Comics & Illustration
            </Link>
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
              <span className="nums-text">{numbertrate(projects.length)}</span>
              <span className="subtext">projects</span>
            </div>
            <div className="numbers-box">
              <span className="nums-text">
                ${numbertrate(loadPledges.totalPledgeNum)}
              </span>
              <span className="subtext">towards creative work</span>
            </div>
            <div className="numbers-box">
              <span className="nums-text">
                {numbertrate(loadPledges.totalPledges)}
              </span>
              <span className="subtext">pledges</span>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="content-container-row">
            <div className="feature-project-holder">
              <span className="home-section-title">FEATURE PROJECT</span>
              <Link className="feature-link" to={`/projects/${randProject.id}`}>
                <div className="feature-image">
                  <img
                    className="img"
                    src={randProject.imageUrl}
                    alt={randProject.title}
                    onError={(e) => {
                      if (e.target.src !== otherSrc) {
                        setNewSrc(otherSrc);
                        e.target.src = otherSrc;
                      }
                    }}
                  />
                </div>

                {/* <div className="search-progressbar-container">
                            
                            </div> */}
                <div className="sp-add-border sp-bar-back" role="progressbar">
                  <div
                    className="sp-green-bar"
                    style={{ width: `${currentProgress}%` }}
                  ></div>
                </div>
                <div id="title" className="feature-title">
                  {randProject.title}
                </div>
                <div className="feature-description">
                  <span className="descr-text">{randProject.description}</span>
                </div>
                <div className="feature-creator">
                  by {randProject.creator.username}
                </div>
              </Link>
            </div>
            <div className="rec-holder">
              <span className="home-section-title">RECOMMENDED FOR YOU</span>
              {projects.length &&
                projects
                  .slice(0)
                  .reverse()
                  .slice(0, 3)
                  .map((project) => {
                    let pledgeTotal = 0;
                    let counter = 0;
                    pledges.forEach((pledge) => {
                      if (project.id == pledge.Project.id) {
                        pledgeTotal += parseInt(pledge.Reward.price);
                        counter++;
                      }
                    });
                    return (
                      <div key={project.id} className="rec-projects">
                        <Link
                          className="rec-project-link"
                          to={`/projects/${project.id}`}
                        >
                          <div className="rec-project-thumbnail">
                            <img
                              className="img"
                              src={project.imageUrl}
                              onError={(e) => {
                                if (e.target.src !== otherSrc) {
                                  setNewSrc(otherSrc);
                                  e.target.src = otherSrc;
                                }
                              }}
                            />
                          </div>
                          <div className="rec-project-details">
                            <span id="title" className="rec-project-title">
                              {project.title}
                            </span>
                            <span className="rec-project-funded">
                              {counter !== 0
                                ? Math.ceil(
                                    (pledgeTotal / project.fundingGoal) * 100
                                  )
                                : 0}
                              % funded
                            </span>
                            <span className="rec-project-creator">
                              By {project.creator.username}
                            </span>
                            <div className="rec-project-bookmark-likes">
                              {/* <i className="fa-regular fa-bookmark"></i> <i className="fa-regular fa-thumbs-up"></i> <i className="fa-regular fa-thumbs-down"></i> */}
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>

        <div className="line-break"></div>

        <div className="content-container"></div>

        <div className="line-break"></div>

        <div className="content-container hp-devsec">
          <div className="content-container-row2">
            <div className="home-section-title">Dev Team</div>
            <div className="devbox1"></div>
          </div>
          <div className="devbox">
            <div className="each-dev">
              <div className="dev-img-holder">
                <img
                  className="img"
                  src="https://avatars.githubusercontent.com/u/102713733?v=4"
                ></img>
              </div>
              <div className="dev-name">Annika Mcpeek</div>
              <div className="hp-devcontact">
                <a
                  target="_blank"
                  href="https://github.com/amcpeek"
                  className="dev-alink"
                >
                  <i className="fa fa-github"></i>
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/annika-mcpeek/"
                  className="dev-alink"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
              <div className="hp-devdownbar"></div>
            </div>
            <div className="each-dev">
              <div className="dev-img-holder">
                <img
                  className="img"
                  src="https://avatars.githubusercontent.com/u/107439068?v=4"
                ></img>
              </div>
              <div className="dev-name">Kirin Agcaoili</div>
              <div className="hp-devcontact">
                <a
                  target="_blank"
                  href="https://github.com/kagc"
                  className="dev-alink"
                >
                  <i className="fa fa-github"></i>
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/kirin-agcaoili"
                  className="dev-alink"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
              <div className="hp-devdownbar"></div>
            </div>
            <div className="each-dev">
              <div className="dev-img-holder">
                <img
                  className="img"
                  src="https://avatars.githubusercontent.com/u/26307465?v=4"
                ></img>
              </div>
              <div className="dev-name">Eric Chai</div>
              <div className="hp-devcontact">
                <a
                  target="_blank"
                  href="https://github.com/no8cai"
                  className="dev-alink"
                >
                  <i className="fa fa-github"></i>
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/eric-chai-b5b9b337/"
                  className="dev-alink"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
              <div className="hp-devdownbar"></div>
            </div>
            <div className="each-dev">
              <div className="dev-img-holder">
                <img
                  className="img"
                  src="https://avatars.githubusercontent.com/u/104010694?v=4"
                ></img>
              </div>
              <div className="dev-name">Cory Bogert</div>
              <div className="hp-devcontact">
                <a
                  target="_blank"
                  href="https://github.com/Cory-Bogert"
                  className="dev-alink"
                >
                  <i className="fa fa-github"></i>
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/cory-bogert-754a7a230/"
                  className="dev-alink"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
              <div className="hp-devdownbar"></div>
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
    );
}

export default Landing;

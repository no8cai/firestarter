import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../../store/project";
import "./Search.css";
import { Link, useParams } from "react-router-dom";
import { getAllPledges } from "../../store/pledge";
import DiscoverPage from "./DiscoverAllProjects";

function SearchResultPage() {
  const params = useParams();
  const dispatch = useDispatch();
  let { searchItem1 } = params;

  if(searchItem1 === 'comics&illustration') searchItem1 = 'comics & illustration'
  if(searchItem1 === 'design&tech') searchItem1 = 'design & tech'
  if(searchItem1 === 'food&craft') searchItem1 = 'food & craft'

  useEffect(() => {
    dispatch(fetchAllProjects());
    dispatch(getAllPledges())
  }, [dispatch]);

  const allPledges = useSelector((state) => state.pledges.allPledges)
  const pledges = Object.values(allPledges)
  const allProjects = useSelector((state) => state.projects);
  // const allProjectsAgain = useSelector((state) => state.projects);
  const projects = Object.values(allProjects);
  // const projectsDupe = Object.values(allProjectsAgain)
  const projectsDupe = Object.values(allProjects)

  let results = [];
  let currentIndex = 0
  if (projects.length) {
    projects.forEach((project) => {
        delete project.creator.email
        delete project.creator.id
        delete project.videoUrl;
        for (let key in project) {

          // ignore searching these keys
          if (key !== 'creatorId' && key !== 'imageUrl' && key !== 'id' && key !== 'startDate' && key !== 'endDate'){

            // searches for username ONLY
          if (typeof project[key] === 'object'){
            if (project[key].username !== undefined && project[key].username.toLowerCase().includes(searchItem1.toLowerCase())){
              // results.push(project)
              results.push(projectsDupe[currentIndex]);
            }
          }
          // searches through REWARDS
          if (Array.isArray(project[key]) && project[key].length){
            project[key].forEach(reward => {
              delete reward.id
              delete reward.price
              delete reward.estimatedDelivery
              for (let rewardKey in reward) {
                if(reward[rewardKey] !== undefined && reward[rewardKey].toString().toLowerCase().includes(searchItem1.toLowerCase())){
                  // results.push(project)
                  results.push(projectsDupe[currentIndex]);
                }

              }
            })
          }
          if (project[key].toString().toLowerCase().includes(searchItem1.toLowerCase())
          ) {
            // results.push(project)
            results.push(projectsDupe[currentIndex]);
          }
        }
          }

        currentIndex++
      }
    );
  }
  let filteredResults = results.filter((result, index) => results.indexOf(result) === index);

  if (!allProjects || !allPledges ) return null;

  return (
    <div className="main-container">
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
      {/* <div className="headline-holder"> */}
      <div className="search-body">
        <div className="content-container">
        {results.length ? (
          <div className="content-container-row2">
<div className="headline-holder">
            <span className="search-explore-text">
              Explore <span className="search-explore-p">{filteredResults.length} project{filteredResults.length > 1 ? "s" : ""}</span>
              </span>
          </div>
          </div>

        ) :
        <div className="content-container-row2">
        <div className="search-headline-holder">
          <span className='search-none'> <i className="fa-solid fa-circle-exclamation"></i> We can't find projects that match your search</span>
          <span>Check out a collection of popular and recommended options below</span>

          </div>

          </div>}
          </div>
      {/* </div> */}
      <div className="all-projects">
        {results.length ? (filteredResults.map((project) => {
            let pledgeTotal = 0
            let counter = 0
            pledges.forEach(pledge => {
              if (project.id === pledge.Project.id){
                pledgeTotal += parseFloat(pledge.Reward.price)
                counter++
              }
            })
            let currentProgress = ((pledgeTotal * 100)/(project.fundingGoal)).toFixed(2)
            // console.log(currentProgress)
            // let oneDay = 24 * 60 * 60 * 1000
            // let splitStart = project.startDate.split('-')
            // let splitEnd = project.endDate.split('-')
            // let firstDate = new Date(splitStart[2], splitStart[0], splitStart[1])
            // let secondDate = new Date(splitEnd[2], splitEnd[0], splitEnd[1])
            // let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
            var date1 = new Date(project.startDate);
            var date2 = new Date(project.endDate);
            var diffTime = Math.abs(date2 - date1);
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return (
              <Link className="feature-link" key={project.id} to={`/projects/${project.id}`}>
                <div className="projects-holder">
                  <div className="preview-image" style={{ backgroundImage: `url('${project.imageUrl}'` }}></div>
                  <div className="project-details">
                    {/* <div className="project-details-top"> */}
                    <div id="title" className="search-project-title">{project.title}
                      </div>
                    <span className="search-descr-text">{project.description}</span>
                    <div className="search-by-text">by {project.creator.username}</div>

              <div className='search-progressbar-container'>
                    <div className="sp-add-border sp-bar-back" role='progressbar'>
                    <div className='sp-green-bar' style={{width: `${currentProgress}%`}}></div>
                    </div>
              </div>


                    <div className="search-pledged">${pledgeTotal} pledged</div>
                    <div className="search-counter">{counter !== 0 ? Math.ceil(((pledgeTotal)/project.fundingGoal)*100) : 0}% funded</div>
                    <div className="search-days">{diffDays} days to go</div>
                    <div className="search-last-line">
                      <span className="search-cat">{project.category}</span>
                      <span>
                        <i className="fa-solid fa-location-dot"></i>{project.city}, {project.country}
                        <br/>
                      </span>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          // <div>
          //   <div className="search-not-found">
          //   <img src="https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b_still_2x.gif?compress=1&resize=400x300&vertical=top"></img>
          // </div>
          <DiscoverPage />
          // </div>

        )}
      </div>
      </div>

    </div>
  );
}

export default SearchResultPage;

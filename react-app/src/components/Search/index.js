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
  console.log(searchItem1)

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
        // delete project.creator;
        // delete project.rewards;
        delete project.creator.email
        delete project.creator.id
        delete project.creatorId
        delete project.videoUrl;
        // delete project.id
        for (let key in project) {

          // ignore searching these keys
          if (key !== 'imageUrl' && key !== 'id' && key !== 'startDate' && key !== 'endDate'){

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
  // let filteredResults = results

  if (!allProjects || !allPledges ) return null;

  return (
    <div className="main-container">
      <div className="categories-bar">
        <span>
          <Link to="/discover/art">Arts</Link>
        </span>
        <span>
          <Link to="/discover/comicsillustration">Comics & Illustration</Link>
        </span>
        <span>
          <Link to="/discover/tech">Design & Tech</Link>
        </span>
        <span>
          <Link to="/discover/film">Film</Link>
        </span>
        <span>
          <Link to="/discover/foodcraft">Food & Craft</Link>
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
            Explore {filteredResults.length} project{filteredResults.length > 1 ? "s" : ""}
          </div>
          </div>

        ) : 
        <div className="content-container-row2">
        <div className="search-headline-holder">
          <span>We can't find projects that match your search</span>
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
                pledgeTotal += pledge.Reward.price
                counter++
              }
            })
            let currentProgress = ((pledgeTotal * 20000)/(project.fundingGoal)*100).toFixed(2)
            let oneDay = 24 * 60 * 60 * 1000
            let splitStart = project.startDate.split('-')
            let splitEnd = project.endDate.split('-')
            let firstDate = new Date(splitStart[2], splitStart[0], splitStart[1])
            let secondDate = new Date(splitEnd[2], splitEnd[0], splitEnd[1])
            let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
            return (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <div className="projects-holder">
                  <div className="preview-image" style={{ backgroundImage: `url('${project.imageUrl}'` }}></div>
                  <div className="project-details">
                    {/* <div className="project-details-top"> */}
                    <div>{project.title}</div>
                    <span className="descr-text">{project.description}</span>
                    <div>by {project.creator.username}</div>

                    <div className="sp-add-border sp-bar-back" role='progressbar'>
                    <div className='sp-green-bar' style={{width: `${currentProgress}%`}}></div>
                    </div>

                    <div>${pledgeTotal} pledged</div>
                    <div>{counter !== 0 ? parseFloat(((pledgeTotal *1000)/project.fundingGoal)*100).toFixed(2) : 0}% funded</div>
                    <div>{diffDays} days to go</div>
                    <div>
                      <span>{project.category}</span>
                      <span>
                        {project.city}, {project.country}
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

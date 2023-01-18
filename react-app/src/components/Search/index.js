import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../../store/project";
import "./Search.css";
import { Link, useParams } from "react-router-dom";
import { getAllPledges } from "../../store/pledge";

function SearchResultPage() {
  const params = useParams();
  const dispatch = useDispatch();
  let { searchItem1 } = params;
  // console.log(searchItem)

  useEffect(() => {
    dispatch(fetchAllProjects());
    dispatch(getAllPledges())
  }, [dispatch]);

  const allPledges = useSelector((state) => state.pledges.allPledges)
  const pledges = Object.values(allPledges)

  const allProjects = useSelector((state) => state.projects);
  const projects = Object.values(allProjects);
  let results = [];
  if (projects.length) {
    projects.forEach((project) => {
        // delete project.creator;
        // delete project.rewards;
        delete project.videoUrl;
        for (let key in project) {
          // searches for username ONLY
          if (typeof project[key] === 'object'){
            if (project[key].username !== undefined && project[key].username.toLowerCase().includes(searchItem1.toLowerCase())){
              results.push(project)
            }
          }
          // searches through REWARDS
          if (Array.isArray(project[key])){
            project[key].forEach(reward => {
              for (let rewardKey in reward) {
                if(reward[rewardKey].toString().toLowerCase().includes(searchItem1.toLowerCase())){
                  results.push(project)
                }
                
              }
            })
          }

          if (project[key].toString().toLowerCase().includes(searchItem1.toLowerCase())
          ) {
              results.push(project);
            // results.forEach(result => {
            //     console.log("AAAAAAAA", project.id, result.id)
            //     if(project.id === result.id){
            //         return console.log("DUPLICATE")
            //     } else {
            //         console.log("should only be one of these", project)
            //     }
            // })
          }
        }
        // } else if (results.length === 0 && resultTrigger === 'no') {
        // resultTrigger = 'yes'
        //     for (let key in project) {
        //         if (project[key].toString().toLowerCase().includes(searchItem1.toLowerCase())) {
        //             if (results.length === 0){
        //                 results.push(project)
        //             } else {
        //                 console.log('results arent 0')
        //             }
        //         }
        //     }
      }

      // }
    );
  }
  let filteredResults = results.filter((result, index) => results.indexOf(result) === index);

  if (!allProjects) return null;

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
      <div className="search-num">
        {results.length ? (
          <div>
            Explore {filteredResults.length} project{filteredResults.length > 1 ? "s" : ""}
          </div>
        ) : null}
      </div>
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
                    <div>{project.description}</div>
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
          <div>
            <img src="https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b_still_2x.gif?compress=1&resize=400x300&vertical=top"></img>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultPage;

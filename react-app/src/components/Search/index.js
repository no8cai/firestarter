import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../../store/project";
import "./Search.css";
import { Link, useParams } from "react-router-dom";

function SearchResultPage() {
  const params = useParams();
  const dispatch = useDispatch();
  let { searchItem1 } = params;
  // console.log(searchItem)

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);
  const allProjects = useSelector((state) => state.projects);
  const projects = Object.values(allProjects);
  let results = [];
  if (projects.length) {
    projects.forEach((project) => {
        // delete project.creator;
        // delete project.rewards;
        delete project.videoUrl;
        for (let key in project) {
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
  // console.log(projects.length)
//   console.log("QQQQQQQQQQQQQQQQ", filteredResults);

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
            return (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <div className="projects-holder">
                  <div className="preview-image" style={{ backgroundImage: `url('${project.imageUrl}'` }}></div>
                  <div className="project-details">
                    {/* <div className="project-details-top"> */}
                    <div>{project.title}</div>
                    <div>{project.description}</div>
                    <div>by {project.creator.username}</div>
                    <div>GREEN FUNDING BAR MATH AAAA</div>
                    <div>$1111 pledged</div>
                    <div>% funded</div>
                    <div>Time until end?</div>
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

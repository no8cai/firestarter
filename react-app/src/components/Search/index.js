import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../../store/project';
import './Search.css'
import { Link, useParams } from 'react-router-dom';

function SearchResultPage() {
    const params = useParams()
    const dispatch = useDispatch()
    let { searchItem1 } = params
    // console.log(searchItem)

    useEffect(() => {
        dispatch(fetchAllProjects())
    }, [dispatch])
    const allProjects = useSelector(state => state.projects)
    const projects = Object.values(allProjects)
    // const filteredProjects = projects.filter(project => project[column] == searchItem)
    let results = []
    if (projects.length){
        projects.forEach(project => {
        for (let key in project){
            if(project[key.toLowerCase()] == searchItem1.toLowerCase() ){
                results.push(project)
            } 
        }})
    }
    
    console.log("EEEEEEEEEEEEE",results)
    
    if (!allProjects) return null
    return (
        <div className="main-container">
            <div className="categories-bar">
        <span><Link to="/discover/art">Arts</Link></span>
        <span><Link to="/discover/comicsillustration">Comics & Illustration</Link></span>
        <span><Link to="/discover/tech">Design & Tech</Link></span>
        <span><Link to="/discover/film">Film</Link></span>
        <span><Link to="/discover/foodcraft">Food & Craft</Link></span>
        <span><Link to="/discover/games">Games</Link></span>
        <span><Link to="/discover/music">Music</Link></span>
        <span><Link to="/discover/publishing">Publishing</Link></span>
    </div>
    <div className="all-projects">
            {results.length ? (results.map(project => {
                return (
                    <Link key={project.id} to={`/projects/${project.id}`}>
                        <div className="projects-holder">
                            <div className="preview-image" style={{backgroundImage: `url('${project.imageUrl}')`}}></div>
                            <div className="project-details">
                                {/* <div className="project-details-top"> */}
                                    <div>{project.title}</div>
                                    <div>{project.description}</div>
                                    <div>by {project.creator.username}</div>
                                    <div>GREEN FUNDING BAR MATH AAAA</div>
                                    <div>$1111 pledged</div>
                                    <div>% funded</div>
                                    <div>Time until end?</div>
                                    <div><span>{project.category}</span><span>{project.city}, {project.country}</span></div>
                                {/* </div> */}
                            </div>
                        </div>
                    </Link>
                )
            })) : (
                <div><img src="https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b_still_2x.gif?compress=1&resize=400x300&vertical=top"></img></div>)}
        </div>
        </div>
        
    )
}

export default SearchResultPage;
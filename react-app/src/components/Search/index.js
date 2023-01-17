import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../../store/project';
import './Search.css'
import { Link } from 'react-router-dom';

function SearchResultPage(cat) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllProjects())
    }, [dispatch])

    const allProjects = useSelector(state => state.projects)
    const nProjects = Object.values(allProjects)
    let projects
    if(allProjects){
        nProjects.forEach(project => {
            if(project.categories == cat){
                projects.push(project)
            }
        })
    }

    return (
        <div className="main-container">
            <div className='content-container'>
                Stuff
            </div>
            <div className="content-container">
                <div className="content-container-row">
                <div className="feature-project-holder">
                <span className="home-section-title">FEATURE PROJECT</span>
                <Link className="feature-link" to={`/project/`}>
                    <div className="feature-image"><img className='img' src={`img.jpg`}></img></div>
                <div className="feature-title">{}</div>
                <div className="feature description">{}</div>
                <div className="feature-creator">by {}</div>
                </Link>
                
            </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultPage;
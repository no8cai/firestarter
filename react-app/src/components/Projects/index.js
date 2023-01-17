import { Route, Switch, NavLink } from 'react-router-dom';
import CreatProject from './CreateProject';
import { useSelector } from 'react-redux';
import ProjectList from './ProjectList';

const Profilepage=()=>{
    const sessionUser = useSelector(state => state.session.user);
    const projectsObj = useSelector(state => state.projects)
    const userprojects=Object.values(projectsObj).filter(el=>el.creatorId=sessionUser.id)
    console.log(userprojects)
    console.log(sessionUser.id)
    console.log(projectsObj)

    return (
        <div>
            <div>
                <div>current user projects</div>
                <div>create new project</div>
                <div>current project rewards</div>
            </div>
            <Switch>
            <Route exact path={'/createproject'}>
            <CreatProject/>
            </Route>
            <Route exact path={'/createproject'}>
            <CreatProject/>
            </Route>
            </Switch>
        </div>
    )
}

export default Profilepage
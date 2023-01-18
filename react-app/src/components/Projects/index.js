import { Route, Switch, NavLink,Link } from 'react-router-dom';
import CreatProject from './CreateProject';
import { useSelector } from 'react-redux';
import EditProject from './EditProject';
import './Projects.css'

const ProjectEntry=()=>{

    return (
        <div>
            <Switch>
            <Route path={'/editproject/:projectId'}>
            <EditProject/>
            </Route>
            <Route exact path={'/createproject'}>
            <CreatProject/>
            </Route>
            </Switch>
        </div>
    )
}

export default ProjectEntry
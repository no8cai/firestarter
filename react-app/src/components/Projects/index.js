import React from 'react';
import { Route,Switch } from 'react-router-dom';
import CreatProject from './CreateProject';
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

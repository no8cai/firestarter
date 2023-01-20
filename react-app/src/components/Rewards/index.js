import React from 'react';
import { Route,Switch } from 'react-router-dom';
import CreateReward from './CreateReward';
import EditReward from './EditReward';
import './Rewards.css'


const RewardEntry=()=>{

    return (
        <div>
            <Switch>
            <Route path={'/editreward/:rewardId'}>
            <EditReward/>
            </Route>
            <Route exact path={'/createreward/:projectId'}>
            <CreateReward/>
            </Route>
            </Switch>
        </div>
    )
}

export default RewardEntry

import React from 'react';
import { Route, Switch, NavLink, useParams } from 'react-router-dom';
import PledgeManager from './PledgesList';
import ProjectManager from './ProjectList';
import RewardManager from './RewardList';
import CreateReward from '../Rewards/CreateReward';
import EditReward from '../Rewards/EditReward';
import EditPledge from '../Pledges/EditPledges';
import { useSelector } from 'react-redux';
import "./Profile.css"

const ManageCenter=()=>{
  const sessionUser = useSelector(state => state.session.user);

    return(
        <div className='profile-manage'>
        <div className='profile-userinfo'>
        <img src='https://ksr-ugc.imgix.net/missing_user_avatar.png?ixlib=rb-4.0.2&w=80&h=80&fit=crop&v=&auto=format&frame=1&q=92&s=6db01a5e4fc00d7967e45fbcb6ff2f74' className="profile-icon01"/>
        <h1>{sessionUser.username}</h1>
        </div>

        <div className='profile-barlist'>
        <NavLink to={`/profile`} className="profile-links">
        <div className='profile-bu'>Projects</div>
        </NavLink>
        <NavLink to={`/profile/pledges`} className="profile-links">
        <div className='profile-bu'>Backed</div>
        </NavLink>

        </div>



        <Switch>
          <Route exact path={'/profile/pledges'}>
          <PledgeManager/>
          </Route>
          <Route exact path={'/profile'}>
          <ProjectManager/>
          </Route>
          <Route path={'/profile/:projectId/rewards'}>
          <RewardManager/>
          </Route>
          {/* <Route path={'/createReward/:projectId'}>
          <CreateReward/>
          </Route>
          <Route path={'/editReward/:rewardId'}>
          <EditReward/>
          </Route> */}
          <Route path={'/projects/:projectId/editpledge/:pledgeId'}>
          <EditPledge/>
          </Route>
        </Switch>
        </div>
    )
}

export default ManageCenter

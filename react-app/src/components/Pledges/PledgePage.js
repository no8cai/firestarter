import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllPledges, deletePledge, updatePledge } from '../../store/pledge';
import { getOneProject } from '../../store/project';
import { getAllRewards } from '../../store/reward';
import './PledgePage.css'


const PledgeDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    // projectId = parseInt(projectId)


    // const allProjects = useSelector(state => Object.values(state.projects))
    // let projectDetails = allProjects.find(project => project.id === projectId)
    // console.log('322323232', projectDetails)

    useEffect(() => {
        // dispatch(getOneProject(id))
        dispatch(getAllRewards(id))
        // dispatch(getAllPledges())
    }, [dispatch])

    let rewards = useSelector(state => state.rewards)
    console.log('rewards------', rewards)
    let rewardsArr = Object.values(rewards)
    console.log('rewardsArr-----', rewardsArr)
    if(!rewardsArr) return null




    // let pledges = useSelector(state => {return state.pledges})
    // console.log('00000000pledges0000000', pledges)
    // let pledgesArr = Object.values(pledges)
    // console.log('--------all the pledges---------', pledgesArr)
    // if(!pledgesArr) return null

    return(
        <>
            {/* <div className='nav-pledge'>
                <button>KICKSTARTER</button>
            </div> */}
            <div className='pledge-project-title'>
                {/* <h1>Title</h1> */}
                <h1>Title</h1>
                <h5>creator</h5>
            </div>

        <div className='pledge-outter-container'>


            <div className='pledge-ul-nav'>
                <p>Rewards > Payment</p>
            </div>

            <div className='reward-selection-text'>
                <h2>Select your reward</h2>
                <p>Select an option below</p>
            </div>



                <input type='radio' />Pledge $20


            <div className='reward-container'>
                {rewardsArr.map(reward => {
                    return (
                        <div className='reward-card'>

                        <div className='reward-card-details'>
                            <h4 className='reward-price'>${reward.price}</h4>
                            <h4 className='reward-title'>${reward.title}</h4>
                            <p className='reward-description'>{reward.description}</p>
                        </div>
                        <div className='reward-card-shipping'>
                            <h6 className='reward-estimated'>ESTIMATED DELIVERY</h6>
                            <h5 className='reward-estimated'>{reward.estimatedDelivery}</h5>
                            <h6 className='reward-estimated'>SHIPS TO</h6>
                            <h5 className='reward-estimated'>Anywhere in the world</h5>
                        </div>

                        </div>

                    )
                })}

            </div>


            {/* {pledgesArr.map(pledge => {
                return (
                    <h1>{pledge.backerId}</h1>
                    )
                })} */}
        </div>
        </>
    )
}
export default PledgeDetails

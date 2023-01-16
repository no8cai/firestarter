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
        dispatch(getOneProject(id))
        dispatch(getAllRewards(id))
        // dispatch(getAllPledges())
    }, [dispatch])


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
                <h1>Title</h1>
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

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchOneProject } from '../../store/project'
import { fetchProjectRewards } from '../../store/reward';
import './PledgePage.css'


const PledgeDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(fetchOneProject(id))
        console.log('fetching one project',fetchOneProject(id))
        dispatch(fetchProjectRewards(id))
    }, [dispatch])

    let project = useSelector(state => {return state.projects[id]})
    console.log('project page', project)

    let rewards = useSelector(state => state.rewards)
    // console.log('rewards------', rewards)
    let rewardsArr = Object.values(rewards)
    // console.log('rewardsArr-----', rewardsArr)
    if(!rewardsArr) return null
    if(!project) return null


    return(
        <>
        <div className='pledge-main-container'>

            <div className='pledge-project-title'>

                <Link className='project-link' key={project.title} to={`/project/${project.id}`}>
                <h1>{project.title}</h1>
                </Link>
                <h5>{project.creator.username}</h5>

            </div>

        <div className='pledge-outter-container'>


            <div className='pledge-ul-nav'>
                <p>Rewards > Payment</p>
            </div>

            <div className='reward-selection-text'>
                <h2>Select your reward</h2>
                <p>Select an option below</p>
            </div>




            <div className='pledge-container'>

            <div className='reward-container'>
                {rewardsArr.map(reward => {
                    return (
                        <div className='reward-card'>

                        <div className='reward-card-details'>
                            {/* <input type='radio' />Pledge $20 */}
                            <h4 className='reward-price'>${reward.price}</h4>
                            <h4 className='reward-title'>{reward.title}</h4>
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
            <div className='guaranteed-container'>

            <div className='guaranteed-description'>
                <img className='guaranteed-img' src='' alt="Rewards aren't guaranteed."/>
                <p>Your pledge will support an ambitious creative project that has yet to be developed. There’s a risk that, despite a creator’s best efforts, your reward will not be fulfilled, and we urge you to consider this risk prior to pledging. Kickstarter is not responsible for project claims or reward fulfillment.</p>


            </div>

            <div className='faq-h3'>
                <h3>FREQUENTLY ASKED QUESTIONS</h3>
            </div>
            <div className='faq'>
                {/* <ul>
                    <li>
                    <a href='#question1'>How do I pledge?</a>
                    <div id='question1'>Enter your pledge amount and select a reward. Then, enter your payment.</div>
                    </li>
                </ul> */}
                <details>
                    <summary>How do I pledge?</summary>
                    Enter your pledge amount and select a reward. Then, enter your payment.
                </details>
                <details>
                    <summary>When is my card charged?</summary>
                    If this project is successfully funded, your card will be charged the following morning. If the project is not funded you will not pay anything.
                </details>
                <details>
                    <summary>So I'm only charged if funding succeeds?</summary>
                    Yes! If the project is not funded no one pays anything.
                </details>
                <details>
                    <summary>What can others see about my pledge?</summary>
                    This project will show up in a list of backed projects in your profile page. No financial information will be made public.
                </details>
                <details>
                    <summary>What if I want to change my pledge?</summary>
                    You can change or cancel your pledge anytime before {project.endDate}.
                </details>
                <details>
                    <summary>If this project is funded, how do I get my reward?</summary>
                    When your reward is ready, {project.creator.username} will send you an email for delivery information.
                </details>

            </div>
        </div>
        </div>
        </div>

    </div>
                </>
    )
}
export default PledgeDetails

//action types
const READ_REWARDS = 'rewards/READ_REWARDS'
const READ_SINGLE_REWARD = 'rewards/READ_SINGLE_REWARD'
const CREATE_REWARD = 'rewards/CREATE_REWARD'
const DELETE_REWARD = 'rewards/DELETE_REWARD'
const UPDATE_REWARD = 'rewards/UPDATE_REWARD'

//action creators
const getProjectRewards = ({Rewards}) => ({
    type: READ_REWARDS,
    Rewards
})

// const getOne = (reward) => ({
//     type: READ_SINGLE_REWARD,
//     reward
// })

const createReward = (reward) => ({
    type: CREATE_REWARD,
    reward
})

const editReward = (reward) => ({
    type: UPDATE_REWARD,
    reward
})


const deleteReward = (rewardId) => ({
    type: DELETE_REWARD,
    rewardId
})


//thunks
export const fetchProjectRewards = (projectId) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}/rewards`);
    if(response.ok){
        const rewardsList = await response.json()
        dispatch(getProjectRewards(rewardsList))
    }
    if(response.status>=400) throw response
}

// export const getOneReward = (backerId) => async dispatch => {
//     const response = await fetch(`/api/rewards/${backerId}`)
//     if(response.ok){
//         const singlereward = await response.json()
//         dispatch(getOne(singlereward))
//     }
// }

export const fetchCreateReward = (reward) => async dispatch => {
    const response = await fetch(`/api/rewards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reward)
    })
    if(response.ok){
        const newreward = await response.json()
        dispatch(createReward(newreward))
        return newreward
    }
    if(response.status>=400) throw response
}

export const fetchUpdateReward = (reward) => async dispatch => {
    const response = await fetch(`/api/rewards/${reward.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reward)
    })
    if(response.ok){
        const editreward = await response.json()
        dispatch(editReward(editreward))
        return editreward
    }
    if(response.status>=400) throw response
}

export const fetchDeleteReward = rewardId => async dispatch => {
    const response = await fetch(`/api/rewards/${rewardId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        dispatch(deleteReward(rewardId))
        return response
    }
    if(response.status>=400) throw response
}

//reducer
const initialState = {}

const rewardsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_REWARDS:
            newState={...state}
            action.Rewards.forEach(reward => {
                newState[reward.id] = reward
            })
            return newState
            
        // case READ_SINGLE_REWARD:
        //     const oneState = {...state}
        //     oneState[action.reward.id] = action.reward
        //     return oneState

        case CREATE_REWARD:
            newState = {...state}
            newState[action.reward.id] = action.reward
            return newState

        case UPDATE_REWARD:
            newState = {...state}
            newState[action.reward.id] = action.reward
            return newState

        case DELETE_REWARD:
            newState = {...state}
            delete newState[action.rewardId]
            return newState

        default:
            return state

    }
}

export default rewardsReducer

//action types
const READ_REWARDS = 'rewards/READ_REWARDS'
const READ_SINGLE_REWARD = 'rewards/READ_SINGLE_REWARD'
const CREATE_REWARD = 'rewards/CREATE_REWARD'
const DELETE_REWARD = 'rewards/DELETE_REWARD'
const UPDATE_REWARD = 'rewards/UPDATE_REWARD'

//action creators
const getAll = ({rewards}) => ({
    type: READ_REWARDS,
    rewards
})

const getOne = (reward) => ({
    type: READ_SINGLE_REWARD,
    reward
})

const create = (reward) => ({
    type: CREATE_REWARD,
    reward
})

const remove = (backerId) => ({
    type: DELETE_REWARD,
    backerId
})

const edit = (reward) => ({
    type: UPDATE_REWARD,
    reward
})

//thunks
export const getAllRewards = () => async dispatch => {
    const response = await fetch(`/api/rewards`);
    if(response.ok){
        const rewardsList = await response.json()
        dispatch(getAll(rewardsList))
    }
}

export const getOneReward = (backerId) => async dispatch => {
    const response = await fetch(`/api/rewards/${backerId}`)
    if(response.ok){
        const singlereward = await response.json()
        dispatch(getOne(singlereward))
    }
}

export const createReward = (payload) => async dispatch => {
    const response = await fetch(`/api/rewards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const reward = await response.json()
        dispatch(create(reward))
        return reward
    }
}

export const updateReward = (payload) => async dispatch => {
    const response = await fetch(`/api/rewards/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const reward = await response.json()
        dispatch(edit(reward))
        return reward
    }
}

export const deleteReward = backerId => async dispatch => {
    const response = await fetch(`/api/rewards/${backerId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        dispatch(remove(backerId))
        return response
    }
}

//reducer
const initialState = {}

const rewardsReducer = (state = initialState, action) => {
    let allRewards = {}
    switch(action.type){
        case READ_REWARDS:
            action.rewards.Rewards.forEach(reward => {
                allRewards[reward.id] = reward
            })
            return {
                ...allRewards
            }
        case READ_SINGLE_REWARD:
            const oneState = {...state}
            oneState[action.reward.id] = action.reward
            return oneState

        case CREATE_REWARD:
            if(!state[action.reward.id]){
                return {
                    ...state,
                    [action.reward.id]: action.reward
                }
            }

        case UPDATE_REWARD:
            let editedreward = {...state}
            editedreward[action.reward.id] = action.reward
            return editedreward

        case DELETE_REWARD:
            const deleteState = {...state}
            delete deleteState[action.backerId]
            return deleteState
        default:
            return state

    }
}

export default rewardsReducer

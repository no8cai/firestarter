//action types
const READ_PLEDGES = 'pledges/READ_PLEDGES' //PL1
const READ_PLEDGES_CURRENT_USER = 'pledges/READ_PLEDGES_CURRENT_USER' //PL2 //not yet created
const READ_PLEDGES_BY_PROJECT_ID = 'pledges/READ_PLEDGES_BY_PROJECT_ID' //PL3 //not finished in reducer
const READ_SINGLE_PLEDGE = 'pledges/READ_SINGLE_PLEDGE' //PL4
const CREATE_PLEDGE = 'pledges/CREATE_PLEDGE' //PL5
const DELETE_PLEDGE = 'pledges/DELETE_PLEDGE' //PL6
const UPDATE_PLEDGE = 'pledges/UPDATE_PLEDGE' //PL7

//action creators
const getAll = (pledges) => ({
    type: READ_PLEDGES,
    pledges
})

const getOne = (pledge) => ({
    type: READ_SINGLE_PLEDGE,
    pledge
})

const getByCurrent = (pledges) => ({
    type: READ_PLEDGES_CURRENT_USER,
    pledges
})

const getByProject = (pledges) => ({
    type: READ_PLEDGES_BY_PROJECT_ID,
    pledges
})

const create = (pledge) => ({
    type: CREATE_PLEDGE,
    pledge
})

const remove = (backerId) => ({
    type: DELETE_PLEDGE,
    backerId
})

const edit = (pledge) => ({
    type: UPDATE_PLEDGE,
    pledge
})

//thunks
export const getAllPledges = () => async dispatch => {
    const response = await fetch(`/api/pledges`);
    if(response.ok){
        const pledgesList = await response.json()
        //console.log('what is the response all pledges', pledgesList)
        dispatch(getAll(pledgesList))
    }
}

export const getOnePledge = (backerId) => async dispatch => {
    const response = await fetch(`/api/pledges/${backerId}`)
    if(response.ok){
        const singlePledge = await response.json()
        dispatch(getOne(singlePledge))
    }
}

export const getAllPledgesByProjectId = (projectId) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}/pledges`)
    if(response.ok){
        const pledgesList = await response.json()
        dispatch(getByProject(pledgesList))
    }
}

export const createPledge = (payload) => async dispatch => {
    const response = await fetch(`/api/pledges`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const pledge = await response.json()
        dispatch(create(pledge))
        return pledge
    }
}

export const updatePledge = (payload) => async dispatch => {
    const response = await fetch(`/api/pledges/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const pledge = await response.json()
        dispatch(edit(pledge))
        return pledge
    }
}

export const deletePledge = backerId => async dispatch => {
    const response = await fetch(`/api/pledges/${backerId}`, {
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

const pledgesReducer = (state = initialState, action) => {
    let allPledges = {}
    switch(action.type){
        case READ_PLEDGES:
            action.pledges.Pledge.forEach(pledge => {
                allPledges[pledge.id] = pledge
            })
            return {
                ...allPledges
            }
        // case READ_PLEDGES_BY_PROJECT_ID:
        //     //this is not right
        //     action.pledges.Pledges.forEach(pledge => {
        //         allPledges[pledge.id] = pledge
        //     })
        //     return {
        //         ...allPledges
        //     }
        case READ_SINGLE_PLEDGE:
            const oneState = {...state}
            oneState[action.pledge.id] = action.pledge
            return oneState

        case CREATE_PLEDGE:
            if(!state[action.pledge.id]){
                return {
                    ...state,
                    [action.pledge.id]: action.pledge
                }
            }

        case UPDATE_PLEDGE:
            let editedPledge = {...state}
            editedPledge[action.pledge.id] = action.pledge
            return editedPledge

        case DELETE_PLEDGE:
            const deleteState = {...state}
            delete deleteState[action.backerId]
            return deleteState
        default:
            return state

    }
}

export default pledgesReducer

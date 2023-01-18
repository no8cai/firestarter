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

export const getOnePledge = (id) => async dispatch => {
    const response = await fetch(`/api/pledges/${id}`)
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

export const getPledgesByCurrentUser = () => async dispatch => {
    const response = await fetch(`/api/pledges/current`)
    if (response.ok){
        const pledgesList = await response.json()
        dispatch(getByCurrent(pledgesList))
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
        dispatch(getOne(pledge))
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
const initialState = { allPledges: {}, pledgesById: {}, onePledge: {}, userPledges: {}}

const pledgesReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_PLEDGES:
            newState = { allPledges: {}, pledgesById: {}, singlePledge: {}, userPledges: { ...state.userPledges}}
            action.pledges.Pledges.forEach(pledge => {
                newState.allPledges[pledge.id] = pledge
            }
            ) 
            return newState
        
        case READ_PLEDGES_BY_PROJECT_ID:
            newState = { ...state, pledgesById: {} }
            action.pledges.Pledges.forEach(pledge => {
                newState.pledgesById[pledge.id] = pledge
            })
            return newState

        case READ_PLEDGES_CURRENT_USER:
            newState = { ...state, userPledges: {} }
            action.pledges.Pledges.forEach(pledge => {
                newState.userPledges[pledge.id] = pledge
            })
            return newState

        case READ_SINGLE_PLEDGE:
            newState = { ...state, singlePledge: {} }
            newState.singlePledge = action.pledge
            return newState

        case CREATE_PLEDGE:
            newState = { ...state, allPledges: { ...state.allPledges }}
            newState.allPledges[action.pledge.id] = action.pledge
            return newState

        case DELETE_PLEDGE:
            newState = { ...state, allPledges: { ...state.allPledges}, pledgesById: { ...state.pledgesById}, userPledges: { ...state.userPledges}}
        // case READ_PLEDGES:
        //     action.pledges.Pledges.forEach(pledge => {
        //         allPledges[pledge.id] = pledge
        //     })
        //     return {
        //         ...allPledges
        //     }
        // // case READ_PLEDGES_BY_PROJECT_ID: //just copied read pledges, need to fix
        // //     //this is not right
        // //     action.pledges.Pledges.forEach(pledge => {
        // //         allPledges[pledge.id] = pledge
        // //     })
        // //     return {
        // //         ...allPledges
        // //     }
        //  // case READ_PLEDGES_CURRENT_USER: //just copied read pledges, need to fix
        // //     action.pledges.Pledges.forEach(pledge => {
        // //         allPledges[pledge.id] = pledge
        // //         return {
        // //             ...allPledges
        // //         }
        // //     })
        // case READ_PLEDGES_BY_PROJECT_ID:
        //     const nextLevel1 = {}
        // action.pledges.Pledges.forEach(pledge => {
        //     nextLevel1[pledge.id] = pledge
        // })
        // return {
        //     ...state,
        //     ['PledgesByProjectId']: nextLevel1
        // }
        // case READ_PLEDGES_CURRENT_USER:
        // const nextLevel2 = {}
        // action.pledges.Pledges.forEach(pledge => {
        //     nextLevel2[pledge.id] = pledge
        // })
        // return {
        //     ...state,
        //     ['currentOwnersPledges']: nextLevel2
        // }

        // case READ_SINGLE_PLEDGE:
        //     const oneState = {...state}
        //     oneState[action.pledge.id] = action.pledge
        //     return oneState

        // case CREATE_PLEDGE:
        //     if(!state[action.pledge.id]){
        //         return {
        //             ...state,
        //             [action.pledge.id]: action.pledge
        //         }
        //     }

        // case UPDATE_PLEDGE:
        //     let editedPledge = {...state}
        //     editedPledge[action.pledge.id] = action.pledge
        //     return editedPledge

        // case DELETE_PLEDGE:
        //     const deleteState = {...state}
        //     delete deleteState[action.backerId]
        //     return deleteState
        default:
            return state

    }
}

export default pledgesReducer

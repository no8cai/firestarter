//action types
const READ_PROJECTS = 'projects/READ_PROJECTS'
const READ_SINGLE_PROJECT = 'projects/READ_SINGLE_PROJECT'
const CREATE_PROJECT = 'projects/CREATE_PROJECT'
const DELETE_PROJECT = 'projects/DELETE_PROJECT'
const UPDATE_PROJECT = 'projects/UPDATE_PROJECT'

//action creators
const getAll = ({projects}) => ({
    type: READ_PROJECTS,
    projects
})

const getOne = (project) => ({
    type: READ_SINGLE_PROJECT,
    project
})

const create = (project) => ({
    type: CREATE_PROJECT,
    project
})

const remove = (projectId) => ({
    type: DELETE_PROJECT,
    projectId
})

const edit = (project) => ({
    type: UPDATE_PROJECT,
    project
})

//thunks
export const getAllProjects = () => async dispatch => {
    const response = await fetch(`/api/projects`);
    if(response.ok){
        const projectsList = await response.json()
        dispatch(getAll(projectsList))
    }
}

export const getOneProject = (projectId) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}`)
    if(response.ok){
        const singleProject = await response.json()
        dispatch(getOne(singleProject))
    }
}

export const createProject = (payload) => async dispatch => {
    const response = await fetch(`/api/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const project = await response.json()
        dispatch(create(project))
        return project
    }
}

export const updateProject = (payload) => async dispatch => {
    const response = await fetch(`/api/projects/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const project = await response.json()
        dispatch(edit(project))
        return project
    }
}

export const deleteProject = projectId => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        dispatch(remove(projectId))
        return response
    }
}

//reducer
const initialState = {}

const projectsReducer = (state = initialState, action) => {
    let allProjects = {}
    switch(action.type){
        case READ_PROJECTS:
            action.projects.Projects.forEach(project => {
                allProjects[project.id] = project
            })
            return {
                ...allProjects
            }
        case READ_SINGLE_PROJECT:
            const oneState = {...state}
            oneState[action.project.id] = action.project
            return oneState

        case CREATE_PROJECT:
            if(!state[action.project.id]){
                return {
                    ...state,
                    [action.project.id]: action.project
                }
            }

        case UPDATE_PROJECT:
            let editedProject = {...state}
            editedProject[action.project.id] = action.project
            return editedProject

        case DELETE_PROJECT:
            const deleteState = {...state}
            delete deleteState[action.projectId]
            return deleteState
        default:
            return state

    }
}

export default projectsReducer

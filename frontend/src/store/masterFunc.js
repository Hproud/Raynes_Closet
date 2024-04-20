import { csrfFetch } from "./csrf";


//? variables --------------------------------------------------------------------------------
const GET_ADMINS = 'master/getAdmins'
const NEWADMIN = 'master/newAdmin'
//& actions ---------------------------------------------------------------------------------

const showAdmins = (admins) => ({
    type: GET_ADMINS,
    admins
})


const singleAdmin = (admin) => ({
    type: NEWADMIN,
    admin
})

//! thunks --------------------------------------------------------------------------------


export const getAllAdmins = () => async (dispatch) => {
    const res = await csrfFetch('/api/master')
    if (res.ok) {
        const admins = await res.json()
        dispatch(showAdmins(admins))
    }

}


export const addAdmin = (email,username, firstName, lastName) => async (dispatch) => {
    const res = await csrfFetch('/api/master', {
        method: 'PUT',
        body: JSON.stringify({
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName
        })
    })

    if (res.ok) {
        const newAdmin = await res.json()
        dispatch(singleAdmin(newAdmin))
        dispatch(getAllAdmins())
    }

}


export const removeAdminStatus = (id) => async (dispatch) => {
    const res = await csrfFetch('/api/master', {
        method: 'DELETE',
        body: JSON.stringify({ id: id })
    })

    if (res.ok) {
        dispatch(getAllAdmins)
    }
}


//^ reducer ---------------------------------------------------------------------------------


const masterReducer = (state = {}, action) => {

    switch (action.type) {

        case GET_ADMINS:
            return { ...state, admins: action.admins }

        default:
            return state
    }


}


export default masterReducer

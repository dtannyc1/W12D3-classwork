import csrfFetch from "./csrf";

// action types
export const RECEIVE_USER = 'RECEIVE_USER'
export const REMOVE_USER = 'REMOVE_USER'

// action creators
export const receiveUser = user => {
    return ({
        type: RECEIVE_USER,
        user: user
    })
}

export const removeUser = userId => {
    return ({
        type: REMOVE_USER,
        userId
    })
}

// Thunk action creators
export const loginUser = user => async dispatch => {
    try {
        let res = await csrfFetch('/api/session', {
            method: "POST",
            body: JSON.stringify(user)
        })

        if (res.ok) {
            let data = await res.json()
            if (data.errors) throw data
            // sessionStorage.setItem('currentUser', JSON.stringify(data.user))
            storeCurrentUser(data.user)
            dispatch(receiveUser(data.user))
        } else {
            throw res
        }
    } catch (error) {
        let errors = await error.json()
        throw errors
    }
}

export const logoutUser = userId => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: "DELETE"
    })

    if (res.ok) {
        sessionStorage.setItem('currentUser', null)
        dispatch(removeUser(userId))
    }
}

export const signup = user => async dispatch => {
    try{
        let res = await csrfFetch('/api/users', {
            method: "POST",
            body: JSON.stringify(user)
        });

        if (res.ok) {
            let data = await res.json();
            if (data.errors) throw data
            storeCurrentUser(data.user);
            dispatch(receiveUser(data.user));
        }
    } catch(error) {
        let errors = await error.json();
        throw errors
    }
}

export const restoreSession = () => async dispatch => {
    let res = await csrfFetch('/api/session');
    if (res.ok) {
        storeCSRFToken(res);
        let data = await res.json();
        storeCurrentUser(data.user);
        dispatch(receiveUser(data.user))
    }
}

// Helper Functions
const storeCurrentUser = user => {
    if (user){
        sessionStorage.setItem('currentUser', JSON.stringify(user))
    } else {
        sessionStorage.removeItem('currentUser')
    }
}

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

// Reducer
const initialState = {user: JSON.parse(sessionStorage.getItem('currentUser'))}
const sessionReducer = (state = initialState, action) => {
    let nextState = {...state}
    switch (action.type) {
        case RECEIVE_USER:
            nextState["user"] = action.user;
            return nextState
        case REMOVE_USER:
            nextState["user"] = null;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer;

// {
//     session: {
//         user: {
//             id,
//             email,
//             username
//         }
//     }
// }

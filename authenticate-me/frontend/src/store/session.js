import csrfFetch from "./csrf";

// actions
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
    let res = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify(user)
    })

    if (res.ok) {
        let data = await res.json()
        sessionStorage.setItem('currentUser', JSON.stringify(data.user))
        dispatch(receiveUser(data.user))
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

export const createUser = user => async dispatch => {
    let res = await csrfFetch('/api/users', {
        method: "POST",
        body: JSON.stringify(user)
    });

    if (res.ok) {
        let data = res.json();
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        dispatch(receiveUser(data.user));
    }
}

// Reducer
const sessionReducer = (state, action) => {
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

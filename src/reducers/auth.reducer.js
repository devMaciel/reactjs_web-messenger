import { authConstants } from "../actions/constants";

const initState = {
    firstName: '',
    lastName: '',
    email: '',
    authenticating: false,
    authenticated: false,
    error: null
}

export default (state = initState, action) => {

    console.log(action);

    switch(action.type){

        case `${authConstants.USER_LOGIN}_REQUEST`:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case `${authConstants.USER_LOGIN}_SUCCESS`:
            state = {
                ...state,
                ...action.payload.user,
                authenticated: true,
                authenticating: false
            }
            break;
        case `${authConstants.USER_LOGIN}_FAILURE`:
            state = {
                ...state,
                authenticated: false,
                authenticating: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}
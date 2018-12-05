import {GOOGLE_AUTH_INIT_SUCCESS, GOOGLE_AUTH_LOGOUT} from '../actions/googleAuth';
import * as utils from '../utils';

const initialState = {
    googleAuthInit: false,
    googleLoggedIn: false
};

export const googleAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case GOOGLE_AUTH_INIT_SUCCESS:
            console.log('Google auth initSuccessful');
            return Object.assign({}, state, { googleAuthInit: true });

        case GOOGLE_AUTH_LOGIN:
            console.log('Logged in');
            return Object.assign({}, state, { googleLoggedIn: true });

        case GOOGLE_AUTH_LOGOUT:
            console.log('Logged out');
            return Object.assign({}, state, { googleLoggedIn: false });

        default:
            return state;
    }
};
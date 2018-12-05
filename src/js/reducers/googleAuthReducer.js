import {GOOGLE_AUTH_INIT_SUCCESS} from '../actions/googleAuth';
import * as utils from '../utils';

const initialState = {
    googleAuthInit: false
};

export const googleAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case GOOGLE_AUTH_INIT_SUCCESS:
            console.log('Google auth initSuccessful');
            return Object.assign({}, state, { googleAuthInit: true });
        default:
            return state;
    }
};
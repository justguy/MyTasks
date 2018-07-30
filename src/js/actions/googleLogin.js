export const GOOGLE_LOGIN = '[Google Login]';

export const GOOGLE_LOGIN_ATTEMPT = `${GOOGLE_LOGIN} LOGIN`;
export const GOOGLE_LOGIN_SUCCESS = `${GOOGLE_LOGIN} SUCCESS`;
export const GOOGLE_LOGIN_FAILURE = `${GOOGLE_LOGIN} FAILURE`;

// action creators
export const login = ({}) => ({
    type: ATTEMPT_GOOGLE_LOGIN,
    payload: { userid: '' }
});

export const success = ({}) => ({
    type: GOOGLE_LOGIN_SUCCESS,
    payload: {
        feature: GOOGLE_LOGIN
    }
});

export const failure = ({}) => ({
    type: GOOGLE_LOGIN_FAILURE,
    payload: {
        feature: GOOGLE_LOGIN
    }
});
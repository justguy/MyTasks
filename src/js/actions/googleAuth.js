import googleapiAuth from '../../googleapi/googleAuth';

export const GOOGLE_AUTH = '[Google Auth]';

export const GOOGLE_AUTH_INIT = `${GOOGLE_AUTH} INIT`;
export const GOOGLE_AUTH_INIT_SUCCESS = `${GOOGLE_AUTH} INIT SUCCESS`;
export const GOOGLE_AUTH_LOGIN = `${GOOGLE_AUTH} LOGIN`;
export const GOOGLE_AUTH_LOGOUT = `${GOOGLE_AUTH} LOGOUT`;

export const googleAuthInit = () => ({
    type: GOOGLE_AUTH_INIT,
    payload: googleapiAuth,
    meta: {
        feature: GOOGLE_AUTH
    }
});

export const googleAuthInitSuccess = ({ isSignedIn }) => ({
    type: GOOGLE_AUTH_INIT_SUCCESS,
    payload: isSignedIn,
    meta: {
        feature: GOOGLE_AUTH
    }
});

export const googleLogin = () => ({
    type: GOOGLE_AUTH_LOGIN,
    meta: {
        feature: GOOGLE_AUTH
    }
});

export const googleLogout = () => ({
    type: GOOGLE_AUTH_LOGOUT,
    meta: {
        feature: GOOGLE_AUTH
    }
});
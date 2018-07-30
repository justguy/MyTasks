export const GOOGLE_API = '[Google API]';

export const GOOGLE_API_INIT = `${GOOGLE_API} INIT`;
export const GOOGLE_API_LOAD_SCRIPT = `${GOOGLE_API} LOAD SCRIPT`;
export const GOOGLE_API_SUCCESS = `${GOOGLE_API} SUCCESS`;
export const GOOGLE_API_FAILURE = `${GOOGLE_API} FAILURE`;

// action creators
export const init = () => ({
    type: GOOGLE_API_INIT
});

export const loadScript = () => ({
    type: GOOGLE_API_LOAD_SCRIPT
});

export const success = ({}) => ({
    type: GOOGLE_API_SUCCESS,
    payload: {
        feature: GOOGLE_API
    }
});

export const failure = ({}) => ({
    type: GOOGLE_API_FAILURE,
    payload: {
        feature: GOOGLE_API
    }
});
// action types
export const SCRIPT_REQUEST = 'SCRIPT_REQUEST';
export const SCRIPT_LOAD = 'SCRIPT_LOAD';
export const SCRIPT_SUCCESS = 'SCRIPT_SUCCESS';
export const SCRIPT_ERROR   = 'SCRIPT_ERROR';

// action creators
export const scriptRequest = ({url, feature}) => ({
    type: `${feature} ${SCRIPT_REQUEST}`,
    meta: {
        url,
        feature
    }
});

export const scriptLoad = ({feature}) => ({
   type: `${feature} ${SCRIPT_LOAD}`,
   meta: {
       feature
   }
});

export const scriptSuccess = ({response, feature}) => ({
    type: `${feature} ${SCRIPT_SUCCESS}`,
    payload: response,
    meta: {
        feature
    }
});

export const scriptError = ({error, feature}) => ({
    type: `${feature} ${SCRIPT_ERROR}`,
    payload: error,
    meta: {
        feature
    }
});
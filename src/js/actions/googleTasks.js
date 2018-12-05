export const GOOGLE_TASKS = '[Google Tasks]';

export const FETCH_GOOGLE_TASKS = `${GOOGLE_TASKS} FETCH`;
export const SET_GOOGLE_TASK = `${GOOGLE_TASKS} SET`;
export const UPDATE_GOOGLE_TASK = `${GOOGLE_TASKS} UPDATE`;

export const fetchGoogleTasks = ({ query }) => ({
    type: FETCH_GOOGLE_TASKS,
    payload: query
});

export const setGoogleTasks = ({ tasks }) => ({
    type: SET_GOOGLE_TASK,
    payload: tasks,
    meta: {
        feature: GOOGLE_TASKS
    }
});

export const updateGoogleTask = ({ status }) => ({
    type: UPDATE_GOOGLE_TASK,
    payload: status,
    meta: {
        feature: GOOGLE_TASKS
    }
});

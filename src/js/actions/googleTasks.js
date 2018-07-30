export const GOOGLE_TASKS = '[Google Tasks]';

export const FETCH_GOOGLE_TASKS = `${GOOGLE_TASKS} FETCH`;
export const SET_GOOGLE_TASKS = `${GOOGLE_TASKS} SET`;

export const fetchGoogleTasks = ({ query }) => ({
    type: FETCH_GOOGLE_TASKS,
    payload: query
});

export const setGoolgeTasks = ({ tasks }) => ({
    type: SET_GOOGLE_TASKS,
    payload: tasks,
    meta: {
        feature: GOOGLE_TASKS
    }
});

export const updateGoogleTask = ({ task }) => ({
    type: UPDATE_GOOGLE_TASK,
    payload: task,
    meta: {
        feature: GOOGLE_TASKS
    }
});
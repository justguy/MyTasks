import {API_REQUEST} from "./api";

export const TASKS = '[Tasks]';

// action types
export const FETCH_TASKS = `${TASKS} ${API_REQUEST}`;
export const SET_TASKS   = `${TASKS} SET`;

// action creators
export const fetchTasks = () => ({
    type: FETCH_TASKS
});

export const setTasks = ({tasks, normalizeKey}) => ({
    type: SET_TASKS,
    payload: tasks,
    meta: {normalizeKey, feature: TASKS}
});
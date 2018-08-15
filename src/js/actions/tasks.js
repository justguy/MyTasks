import {API_REQUEST} from "./api";

export const TASKS = '[Tasks]';

// action types
export const FETCH_TASKS = `${TASKS} FETCH`;
export const SET_TASKS   = `${TASKS} SET`;
export const UPDATE_TASK = `${TASKS} UPDATE`;
export const REMOVE_TASK = `${TASKS} REMOVE`;

// action creators
export const fetchTasks = () => ({
    type: FETCH_TASKS
});

export const setTasks = ({tasks}) => ({
    type: SET_TASKS,
    payload: tasks,
    meta: {feature: TASKS}
});

export const updateTask = (task) => ({
    type: UPDATE_TASK,
    payload: task,
    meta: {feature: TASKS}
});

export const removeTask = (id) => ({
    type: REMOVE_TASK,
    payload: id,
    meta: {feature: TASKS}
});
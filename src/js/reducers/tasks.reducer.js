import {SET_TASKS} from "../actions/tasks";

const initialState = [];

export const tasksReducer = (tasks = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return action.payload;
        default:
            return tasks;
    }
};
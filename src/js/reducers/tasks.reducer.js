import {SET_TASKS, UPDATE_TASK, REMOVE_TASK} from '../actions/tasks';
import * as utils from '../utils';

const initialState = [];

export const tasksReducer = (tasks = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return action.payload;
        case UPDATE_TASK:
            return Object.assign({}, tasks[action.payload.id], action.payload);
        case REMOVE_TASK:
            return utils.omit(action.payload, tasks);
        default:
            return tasks;
    }
};
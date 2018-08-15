import {SET_TASKS, UPDATE_TASK, REMOVE_TASK} from '../actions/tasks';
import * as utils from '../utils';

const initialState = [];

export const tasksReducer = (tasks = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return action.payload;
        case UPDATE_TASK:
            // update in 2 steps - task and then state
            let updatedTask = Object.assign({}, tasks[action.payload.id], action.payload);
            return Object.assign([], tasks, {[action.payload.id]: updatedTask});
        case REMOVE_TASK:
            return utils.omit(action.payload.id, tasks);
        default:
            return tasks;
    }
};
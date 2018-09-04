import {SET_TASKS, UPDATE_TASK, REMOVE_TASK} from '../actions/tasks';
import * as utils from '../utils';

const initialState = [];

export const tasksReducer = (tasks = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return action.payload;
        case UPDATE_TASK:
            // get the id when updating, or generate an id for when adding
            let id = action.payload.id || utils.generateID();
            // update in 2 steps - update/create the task and then add the state
            let updatedTask = Object.assign({}, tasks[id], action.payload, { id : id });
            return Object.assign([], tasks, {[id]: updatedTask});
        case REMOVE_TASK:
            return utils.omit(action.payload.id, tasks);
        default:
            return tasks;
    }
};
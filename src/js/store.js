// create the core middleware array
import {actionSplitterMiddleware} from "./middleware/core/actionSplitter";
import {apiMiddleware} from "./middleware/core/api";
import {loggerMiddleware} from "./middleware/core/logger";
import {MyBehaviorSubject} from "./rx/myBehaviorSubject";

const coreMiddleware = [
    actionSplitterMiddleware,
    apiMiddleware,
    loggerMiddleware
];

const featureMiddleware = [

];

const validateAction = (action) => {
    if (!action || typeof action !== 'object' || Array.isArray(action)) {
        throw new Error('An ACTION must be an object!');
    }

    if (typeof action.type === 'undefined') {
        throw new Error('The ACTION is missing a type!');
    }
};

const validateReducers = (reducers) => {
    if (!reducers || !Array.isArray(reducers)) {
        throw new Error('A reducers array must be provided');
    }
};

const createStore = (reducers, initialState) => {
    validateReducers(reducers);

    let state = new MyBehaviorSubject(initialState);

    return {
        dispatch: (action) => {
            validateAction(action);

            let newState = reducers.reduce();

            state.next(newState);
        },
        getState: () => state.getValue(),
        subscribe: (observer) = state.subscribe,
        undo: () => state.undo
    }
};
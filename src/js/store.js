// create the core middleware array
import {MyBehaviorSubject} from "./rx/myBehaviorSubject";

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

export const createStore = (reducers, middlewares, initialState) => {
    // if the reducers are invalid, stop now
    validateReducers(reducers);

    // create the state
    let state = new MyBehaviorSubject(initialState);

    // create all store methods
    const getState = () => state.getValue();
    const subscribe = (observer) => state.subscribe(observer);
    const undo = () => state.undo();
    let dispatch = null;

    // set the default dispatcher without middleware
    let dispatcher = (action) => {
        validateAction(action);

        let stateValue = reducers.reduce((state, reducer) => reducer(state, action), state.getValue());

        state.next(stateValue);
    };

    // if middlewares were provided, wrap the dispatch
    if (middlewares && middlewares.length) {
        const middlewareAPI = {
            getState,
            dispatch: (...args) => dispatch(...args)
        };

        // curry to chain the middlewares
        const middlewareChain = middlewares.map(middleware => middleware(middlewareAPI));
        // wrap the dispatcher with the reducers and replace the dispatch signature
        dispatch = middlewareChain.reduce((a, b) => (...args) => a(b(...args)))(dispatcher);
    } else {
        dispatch = dispatcher;
    }

    return {
        dispatch,
        getState,
        subscribe,
        undo
    }
};

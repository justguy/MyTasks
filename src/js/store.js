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

    // set the default dispatcher without middleware
    const dispatcher = (action) => {
        validateAction(action);

        let stateValue = reducers.reduce((s, reducer) => reducer(s, action), state.getValue());

        state.next(stateValue);
    };

    // apply middleware and replace the dispatcher
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    // wrap the dispatcher with the reducers and replace the dispatch signature
    const dispatch = (action) => {
        // define the payload and chain middlewares (taken from Redux)
        const middlewareAPI = {
            getState,
            dispatch: (...args) => dispatcher(...args)
        };

        return middlewares.reduce((s, middleware) => reducer(s, action), state.getValue());
    };

    return {
        dispatch,
        getState,
        subscribe,
        undo
    }
};

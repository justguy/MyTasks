import {objectDifference} from '../../utils';

export const loggerMiddleware = ({getState}) => (next) => (action) => {
    // keep reference to current state for comparison
    let prevState = getState();

    console.group(`${action.type}`);

    console.group('CURRENT STATE:');
    console.log(prevState);
    console.groupEnd();

    next(action);

    let nextState = getState();

    console.group('NEXT STATE: ');
    console.log(nextState);
    console.groupEnd();

    console.group('CHANGES: ');
    console.log(objectDifference(prevState, nextState));
    console.groupEnd();

    console.groupEnd();
};
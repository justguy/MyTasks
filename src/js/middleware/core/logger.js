export const loggerMiddleware = ({getState}) => (next) => (action) => {
    console.group(`${action.type}`);

    console.group('CURRENT STATE:');
    console.log(getState());
    console.groupEnd();

    next(action);

    console.group('NEXT STATE: ');
    console.log(getState());
    console.groupEnd();

    console.groupEnd();
};
export const task = ({getState}) => (id) => {
    let state = getState();
    return state[id];
};
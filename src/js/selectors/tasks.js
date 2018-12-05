const tasks = ({getState}) => () => {
    return Object.values(getState());
};

const task = ({getState}) => (id) => {
    return tasks({getState})().find((t) => t.id === id);
};

const taskCount = ({getState}) => (completedOnly) => {
    return tasks({getState})().filter((task) => !completedOnly || task.completed).length;
};

export {
    tasks,
    task,
    taskCount
};
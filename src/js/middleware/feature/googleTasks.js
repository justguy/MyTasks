import {TASKS, FETCH_TASKS, setTasks} from "../../actions/tasks";
import {API_ERROR, API_SUCCESS, apiRequest} from "../../actions/api";

const TASKS_URL = 'static/tasks.json';

export const googleTasksMiddleware = () => (next) => (action) => {
    next(action);

    switch (action.type) {
        case FETCH_TASKS:
            next(apiRequest({
                    body: null,
                    method: 'GET',
                    url: TASKS_URL,
                    feature: TASKS
                })
            );
            break;

        case `${TASKS} ${API_SUCCESS}`:
            next(setTasks({
                    tasks: action.payload.tasks
                })
            );
            break;

        case `${TASKS} ${API_ERROR}`:
            // no fallback
            break;
    }
};
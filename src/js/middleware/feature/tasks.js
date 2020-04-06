import {TASKS, FETCH_TASKS, setTasks} from "../../actions/tasks";
import {API_ERROR, API_SUCCESS} from "../../actions/api";
import {fetchGoogleTasks} from "../../actions/googleTasks";

const TASKS_URL = 'static/tasks.json';

export const tasksMiddleware = () => (next) => (action) => {
    next(action);

    switch (action.type) {

        case FETCH_TASKS:
            next(fetchGoogleTasks({
                    feature: TASKS
                })
            );
            break;

    }
};
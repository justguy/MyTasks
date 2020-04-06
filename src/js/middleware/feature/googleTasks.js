import {TASKS, FETCH_TASKS, setTasks} from "../../actions/tasks";
import {API_ERROR, API_SUCCESS, apiRequest} from "../../actions/api";
import {FETCH_GOOGLE_TASKS} from "../../actions/googleTasks";

const TASKS_URL = 'static/tasks.json';

export const googleTasksMiddleware = () => (next) => (action) => {
    next(action);

    switch (action.type) {
        case FETCH_GOOGLE_TASKS:
            window.gapi.client.tasks.tasklists.list({}).then((response) => {
                let taskLists = response.result.items;
                console.log(taskLists);
                next(setTasks(response.result.items));
            });

            break;

    }
};
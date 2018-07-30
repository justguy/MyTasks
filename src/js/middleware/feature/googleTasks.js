import { GOOGLE_TASKS, FETCH_GOOGLE_TASKS, setGoolgeTasks } from "../../actions/googleTasks";
import { API_ERROR, API_SUCCESS, apiRequest } from "../../actions/api";
import { setLoader } from "../../actions/ui";

const GOOGLE_TASKS_URL = '';

export const googleTasksMiddleware = () => (next) => (action) => {
    next(action);

    switch (action.type) {
        case FETCH_GOOGLE_TASKS:
            next([
                apiRequest({
                    body: null,
                    method: 'GET',
                    url: GOOGLE_TASKS_URL,
                    feature: GOOGLE_TASKS
                }),
                setLoader({
                    state: true,
                    feature: GOOGLE_TASKS
                })
            ]);
            break;
        case `${GOOGLE_TASKS} ${API_SUCCESS}`:
            next([
                setGoolgeTasks({
                    tasks: action.payload.tasks
                }),
                setLoader({
                    state: false,
                    feature: GOOGLE_TASKS
                })
            ]);
            break;
        case `${GOOGLE_TASKS} ${API_ERROR}`:
            next([
                setNotification({
                    message: action.payload.message,
                    feature: GOOGLE_TASKS
                }),
                setLoader({
                    state: false,
                    feature: GOOGLE_TASKS
                })
            ]);
            break;
    }
};
import { GOOGLE_API, GOOGLE_API_INIT, google } from "../../actions/googleAPI";
import { scriptRequest, scriptLoad, scriptSuccess } from "../../actions/script";
import { setLoader } from "../../actions/ui";

const GOOGLE_API_URL = 'https://apis.google.com/js/api.js';

export const googleAPIMiddleware = () => (next) => (action) => {
    next(action);

    switch (action.type) {
        case `${GOOGLE_API} ${SCRIPT_REQUEST}`:
            next(scriptLoad({
                    url: GOOGLE_API_URL,
                    feature: GOOGLE_API
                }));
            break;
        case `${GOOGLE_API} ${SCRIPT_LOAD}`:
            next()
            break;
        case `${GOOGLE_API} ${API_SUCCESS}`:
            next([
                setGoolgeTasks({
                    tasks: action.payload.tasks
                }),
                setLoader({
                    state: false,
                    feature: GOOGLE_API
                })
            ]);
            break;
        case `${GOOGLE_API} ${API_ERROR}`:
            next([
                setNotification({
                    message: action.payload.message,
                    feature: GOOGLE_API
                }),
                setLoader({
                    state: false,
                    feature: GOOGLE_API
                })
            ]);
            break;
    }
};
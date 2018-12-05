import {TASKS, FETCH_TASKS, setTasks} from "../../actions/tasks";
import {API_ERROR, API_SUCCESS, apiRequest} from "../../actions/api";
import {
    GOOGLE_AUTH_INIT,
    GOOGLE_AUTH_LOGOUT,
    googleLogin,
    googleAuthInitSuccess,
    googleLogout
} from "../../actions/googleAuth";

export const googleAuthMiddleware = () => (next) => (action) => {
    next(action);

    switch (action.type) {
        case GOOGLE_AUTH_INIT:
            window.gapi.load('client:auth2', () => {
                // Initialize the client with API key and People API, and initialize OAuth with an
                // OAuth 2.0 client ID and scopes (space delimited string) to request access.
                window.gapi.client.init({
                    apiKey: action.payload.apikey,
                    clientId: action.payload.clientId,
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'],
                    scope: 'https://www.googleapis.com/auth/tasks.readonly'
                }).then(function () {
                    // Listen for sign-in state changes.
                    window.gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
                        next(googleAuthInitSuccess({ isSignedIn }));
                    });

                    // Handle the initial sign-in state.
                    // When signin status changes, this function is called.
                    // If the signin status is changed to signedIn, we make an API call.
                    let isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
                    next(googleAuthInitSuccess({ isSignedIn }));
                });
            });
            break;

        case GOOGLE_AUTH_LOGIN:
            window.gapi.auth2.getAuthInstance().signIn();
            break;

        case GOOGLE_AUTH_LOGOUT:
            window.gapi.auth2.getAuthInstance().signOut();
            break;

        case `${TASKS} ${API_ERROR}`:
            // no fallback
            break;
    }
};
import { SCRIPT_REQUEST, scriptSuccess, scriptError } from "../actions/script";

export const scriptMiddleware = ({dispatch}) => (next) => (action) => {
    next(action);

    if (action.type.includes(SCRIPT_REQUEST)) {
        const {url, feature} = action.meta;

        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = () => {
            dispatch(scriptLoad({feature}));
        };
        script.onreadystatechange = () => {
            if (script.readyState === 'complete') {
                if (script.status === 200) {
                    dispatch(scriptSuccess({feature}));
                } else {
                    dispatch(scriptError({error: script.responseText, feature}));
                }
            }
        };
        document.body.appendChild(script);
    }
};
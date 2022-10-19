import { authAction } from './auth-slice';

let logoutTimer;

export const loginActionHandler = (data) => {
    return (dispatch) => {
        dispatch(authAction.login(data));
        logoutTimer = setTimeout(() => {
            dispatch(authAction.logout());
        }, data.expiresIn * 1000);
    }
}

export const logoutActionHandler = () => {
    return (dispatch) => {
        dispatch(authAction.logout());
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }
}

export const loginAgainActionHandler = (data) => {
    return (dispatch) => {
        const currentTime = new Date().getTime();
        const expirationTime = new Date(data.expirationDate).getTime();
        dispatch(authAction.loginAgain(data));
        logoutTimer = setTimeout(() => {
            dispatch(authAction.logout());
        }, expirationTime - currentTime);
    }
}


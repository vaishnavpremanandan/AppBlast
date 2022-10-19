import { notificationAction } from './notification-slice';

export const showNotif = (msg, type) => {
    return (dispatch, getState) => {
        const { ui } = getState();
        if (ui.show && type === 'success') {
            dispatch(notificationAction.hideNotif());
            setTimeout(() => {
                dispatch(notificationAction.successNotif(msg))
            }, 600);
        }
        if (ui.show && type === 'error') {
            dispatch(notificationAction.hideNotif());
            setTimeout(() => {
                dispatch(notificationAction.errorNotif(msg))
            }, 600);
        }
        if (!ui.show && type === 'success') {
            dispatch(notificationAction.successNotif(msg))
        }
        if (!ui.show && type === 'error') {
            dispatch(notificationAction.errorNotif(msg));
        }
    }
}
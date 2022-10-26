import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { notificationAction } from '../../../store/notification-slice';
import classes from './Notification.module.css';

const classList = {
    enter: '',
    enterActive: classes['notif-show'],
    exit: '',
    exitActive: classes['notif-hide'],
}

const Notification = () => {
    const { show, type, message } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const typeClass = (type === 'success') ? classes.success : classes.danger;

    const hideHandler = () => {
        dispatch(notificationAction.hideNotif());
    }

    return (
        <CSSTransition
            mountOnEnter
            unmountOnExit
            in={show}
            timeout={400}
            classNames={classList}
        >
            <div className={classes.notif}>
                <div className={typeClass}></div>
                <div className={classes.content}>
                    <div className={classes.header}>
                        {type === 'success' ? <h3>&#10004; Success</h3> : <h3>&#10008; Error</h3>}
                        <button onClick={hideHandler}>&#10005;</button>
                    </div>
                    <p>{message}</p>
                </div>
            </div>
        </CSSTransition>
    );
}

export default Notification;

import classes from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../../../store/login-form-slice';
import { logoutActionHandler } from '../../../store/auth-actions';
import { showNotif } from '../../../store/notification-actions';

const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    const logoutHandler = () => {
        dispatch(logoutActionHandler());
        history.replace('/projects');
        dispatch(showNotif('Goodbye', 'success'));
    }

    const showLoginHandler = () => {
        dispatch(loginAction.showLoginForm());
    }

    return (
        <nav className={classes.navbar}>
            <ul>
                <li>
                    <h3>AB</h3>
                </li>
                <NavLink to='/projects' className={classes.home}>
                    <li>Home</li>
                </NavLink>
                {isLoggedIn ? <li onClick={logoutHandler}>Logout</li> : <li onClick={showLoginHandler}>Login</li>}
            </ul>
        </nav>
    );
}

export default NavBar;
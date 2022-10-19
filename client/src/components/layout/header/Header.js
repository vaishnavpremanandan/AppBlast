import SecondaryButton from '../../UI/button/SecondaryButton';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../../store/login-form-slice';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const showLoginHandler = () => {
        dispatch(loginAction.showLoginForm());
    }

    return(
        <div className={classes.headercontainer}>
            <div>
                <h1>AppBlast</h1>
                <p>
                    AppBlast is a self-promotion website where web designers 
                    and developers can showcase their work in which other users 
                    can also review. 
                </p>
                {isLoggedIn ? 
                    <Link to='/projects/new'>
                        <SecondaryButton>Share your work</SecondaryButton>
                    </Link> : 
                    <SecondaryButton onClick={showLoginHandler}>Share your work</SecondaryButton>
                }
            </div>
        </div>
    )
}

export default Header;
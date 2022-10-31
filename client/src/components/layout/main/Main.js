import PropTypes from 'prop-types';

import classes from './Main.module.css';

const Main = ({ children }) => {
    return <div className={classes.main}>{ children }</div>
}

Main.propTypes = {
    children: PropTypes.any
}

export default Main;
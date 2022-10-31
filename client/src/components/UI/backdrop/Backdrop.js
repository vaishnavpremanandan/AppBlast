import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.module.css';

const Backdrop = ({ onClick }) => {
    return <div className={classes.backdrop} onClick={onClick}></div>
}

Backdrop.propTypes = {
    onClick: PropTypes.func
}

export default React.memo(Backdrop);
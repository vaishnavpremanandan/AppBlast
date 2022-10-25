import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = ({ onClick }) => {
    return <div className={classes.backdrop} onClick={onClick}></div>
}

export default React.memo(Backdrop);
import React from 'react';
import classes from './Loading.module.css';

const Loading = () => {
    return (
        <div className={classes.spinner}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default React.memo(Loading);
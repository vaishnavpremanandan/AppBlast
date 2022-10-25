import React from 'react';
import classes from './SecondaryButton.module.css';

const SecondaryButton = ({ children, onClick }) => {
    return (
        <button className={classes.button} onClick={onClick}>
            {children}
        </button>
    )
}

export default React.memo(SecondaryButton);
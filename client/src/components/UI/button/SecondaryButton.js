import React from 'react';
import PropTypes from 'prop-types';

import classes from './SecondaryButton.module.css';

const SecondaryButton = ({ children, onClick }) => {
    return (
        <button className={classes.button} onClick={onClick}>
            {children}
        </button>
    )
}

SecondaryButton.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func
}

export default React.memo(SecondaryButton);
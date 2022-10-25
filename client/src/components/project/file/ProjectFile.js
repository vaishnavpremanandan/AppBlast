import React from 'react';
import classes from './ProjectFile.module.css';

const ProjectFile = ({ id, type, onChangeHandler, error, errorMsg }) => {
    const imageClass = error ? classes['file-invalid'] : classes.file;

    return (
        <div className={classes.container}>
            <label htmlFor='image'>
                {type === 'New Post' ? 'Image (required)' : 'Change Existing Image (optional)'}
            </label>
            <input
                type='file'
                id={id}
                className={imageClass}
                onChange={onChangeHandler}
            />
            {error && <span>{errorMsg}</span>}
        </div>
    );
}

export default React.memo(ProjectFile);
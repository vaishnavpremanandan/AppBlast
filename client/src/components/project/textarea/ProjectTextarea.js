import classes from './ProjectTextarea.module.css';

const ProjectTextarea = ({ value, onChangeHandler, onBlurHandler, error, errorMsg, id, name }) => {
    const textareaClass = error ? classes['textarea-invalid'] : classes.textarea;

    return (
        <div className={classes.container}>
            <label htmlFor={id}>{name}</label>
            <textarea
                id={id}
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className={textareaClass}
            ></textarea>
            {error && <span>{errorMsg}</span>}
        </div>
    );
}

export default ProjectTextarea;
import PropTypes from "prop-types";
import React from "react";
import classes from "./ProjectTextarea.module.css";

const ProjectTextarea = ({
  value,
  onChangeHandler,
  onBlurHandler,
  error,
  errorMsg,
  id,
  name,
}) => {
  const textareaClass = error ? classes["textarea-invalid"] : classes.textarea;

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
};

ProjectTextarea.propTypes = {
  value: PropTypes.string,
  onChangeHandler: PropTypes.func,
  onBlurHandler: PropTypes.func,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default React.memo(ProjectTextarea);

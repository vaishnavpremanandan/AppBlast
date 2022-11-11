import PropTypes from "prop-types";
import React from "react";
import classes from "./ProjectInput.module.css";

const ProjectInput = ({
  value,
  onChangeHandler,
  onBlurHandler,
  error,
  errorMsg,
  id,
  name,
}) => {
  const inputClass = error ? classes["input-invalid"] : classes.input;

  return (
    <div className={classes.container}>
      <label htmlFor={id}>{name}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        className={inputClass}
      />
      {error && <span>{errorMsg}</span>}
    </div>
  );
};

ProjectInput.propTypes = {
  value: PropTypes.string,
  onChangeHandler: PropTypes.func,
  onBlurHandler: PropTypes.func,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default React.memo(ProjectInput);

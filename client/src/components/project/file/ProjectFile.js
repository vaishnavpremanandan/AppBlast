import React from "react";
import PropTypes from "prop-types";
import classes from "./ProjectFile.module.css";

const ProjectFile = ({ id, type, onChangeHandler, error, errorMsg }) => {
  const imageClass = error ? classes["file-invalid"] : classes.file;

  return (
    <div className={classes.container}>
      <label htmlFor="image">
        {type === "New Post"
          ? "Image (required)"
          : "Change Existing Image (optional)"}
      </label>
      <input
        type="file"
        id={id}
        className={imageClass}
        onChange={onChangeHandler}
      />
      {error && <span>{errorMsg}</span>}
    </div>
  );
};

ProjectFile.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  onChangeHandler: PropTypes.func,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default React.memo(ProjectFile);

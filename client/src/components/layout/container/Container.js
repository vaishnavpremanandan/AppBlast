import PropTypes from "prop-types";
import classes from "./Container.module.css";

const Container = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.any,
};

export default Container;

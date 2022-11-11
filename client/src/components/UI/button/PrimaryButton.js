import PropTypes from "prop-types";
import classes from "./PrimaryButton.module.css";

const PrimaryButton = ({ children, isDisabled = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={isDisabled ? classes["button-invalid"] : classes["button"]}
    >
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PrimaryButton;

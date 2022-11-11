import PropTypes from "prop-types";
import Card from "../../UI/card/Card";

const ShowError = ({ message }) => {
  return (
    <Card>
      <h1 style={{ textAlign: "center" }}>
        <span style={{ color: "red" }}>&#10008; </span>
        {message}
      </h1>
    </Card>
  );
};

ShowError.propTypes = {
  message: PropTypes.string,
};

export default ShowError;

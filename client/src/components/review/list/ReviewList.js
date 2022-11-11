import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Rating } from "react-simple-star-rating";

import classes from "./ReviewList.module.css";
import PrimaryButton from "../../UI/button/PrimaryButton";

const ReviewList = ({ data, onDeleteReview }) => {
  const currentUserId = useSelector((state) => state.auth.currentUserId);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <ul className={classes.reviewlist}>
      {data.length === 0 ? <h3>No Reviews</h3> : <h3>Reviews</h3>}
      {data.map((review) => (
        <li key={review._id}>
          <hr></hr>
          <p>{review.comment}</p>
          <p className={classes.author}>
            Reviewed by: {review.author.username}
          </p>
          <div>
            <Rating size={25} readonly={true} initialValue={review.rating} />
            {isLoggedIn && currentUserId === review.author._id && (
              <PrimaryButton onClick={onDeleteReview.bind(null, review._id)}>
                Delete
              </PrimaryButton>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

ReviewList.propTypes = {
  data: PropTypes.array,
  onDeleteReview: PropTypes.func,
};

export default ReviewList;

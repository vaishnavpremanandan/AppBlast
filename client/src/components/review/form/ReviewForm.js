import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './ReviewForm.module.css';
import { Rating } from "react-simple-star-rating";
import PrimaryButton from '../../UI/button/PrimaryButton';

const ReviewForm = ({ onNewReview }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const currentUserId = useSelector(state => state.auth.currentUserId);

    const onReviewSubmit = (event) => {
        event.preventDefault();
        onNewReview({
            rating: rating / 20, 
            comment,
            author: currentUserId
        });
        setComment('');
        setRating(0);
    }

    const ratingClickHandler = (value) => {
        setRating(value);
    }

    const commentChangeHandler = (event) => {
        setComment(event.target.value);
    }

    let formIsValid = false;
    if (comment.trim().length > 0 && rating > 0) {
        formIsValid = true;
    }

    return (
        <form className={classes.reviewform} onSubmit={onReviewSubmit}>
            <h3>Leave a Review</h3>
            <hr></hr>
            <label>Rating</label>
            <Rating size={25} ratingValue={rating} onClick={ratingClickHandler} />
            <label>Comment</label>
            <textarea value={comment} onChange={commentChangeHandler}></textarea>
            <PrimaryButton isDisabled={!formIsValid}>Submit</PrimaryButton>
        </form>
    );
}

export default React.memo(ReviewForm);
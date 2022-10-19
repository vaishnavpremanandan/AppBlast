import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Card from '../UI/card/Card';
import ReviewForm from './form/ReviewForm';
import ReviewList from './list/ReviewList';
import Loading from '../UI/loading/Loading';

const Review = ({ onDeleteReview, onAddReview, reviews, isLoading }) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const content = (
        <Fragment>
            {isLoggedIn && <ReviewForm onNewReview={onAddReview} /> }
            <ReviewList data={reviews} onDeleteReview={onDeleteReview} />
        </Fragment>
    );

    return (
        <Card>
            {isLoading ? <Loading /> : content }
        </Card>
    );
}

export default Review;
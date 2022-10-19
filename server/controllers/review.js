const Review = require('../models/review');
const Project = require('../models/project');

// Create a review

module.exports.createReview = async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(id)
    const review = new Review(req.body);
    project.reviews.push(review);
    await project.save()
    await review.save();
    res.status(200).send({ status: '200', message: 'Successfully created a review'});
}

// Delete a review

module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Project.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    res.status(200).send({ status: '200', message: 'Successfully deleted a review'});
}
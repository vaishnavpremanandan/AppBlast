const Project = require("./models/project");
const Review = require("./models/review");
const { projectSchema, reviewSchema, userSchema } = require("./schemas");
const AppError = require("./utils/AppError");

// Validate project middleware

module.exports.validateProject = (req, res, next) => {
  req.body.date = new Date().getTime();
  const { error } = projectSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validate reviews middleware

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validate user middleware

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Checks if the given project/post belongs to the user

module.exports.isProjectAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { author: requestUserId } = req.body;
  const project = await Project.findById(id);
  if (!project.author.equals(requestUserId)) {
    return res
      .status(400)
      .json({
        status: "400",
        message: "You do not have permission to edit/delete this post",
      });
  }
  next();
};

// Checks if the given review belongs to the user

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const { author: requestUserId } = req.body;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(requestUserId)) {
    return res
      .status(400)
      .json({
        status: "400",
        message: "You do not have permission to edit/delete this review",
      });
  }
  next();
};

const express = require("express");
const router = express.Router({ mergeParams: true });
const review = require("../controllers/review");
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isReviewAuthor } = require("../middleware");
const passport = require("passport");

// Create review route

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateReview,
  wrapAsync(review.createReview)
);

// Delete review route

router.delete(
  "/:reviewId",
  passport.authenticate("jwt", { session: false }),
  isReviewAuthor,
  wrapAsync(review.deleteReview)
);

module.exports = router;

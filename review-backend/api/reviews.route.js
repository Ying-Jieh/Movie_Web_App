import express from 'express'; // For handling HTTP requests and responses.
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router(); // This router will handle routing for the movie review endpoints.

// router.route("/movie/:id"): This sets up a route for the root path ("/movie/:id"). ":id" is a variable of the route
// this route should handle GET requests, and directs them to the aptGetReviews function
// router.route('/').get((req, res) => res.send("hello world"))
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews);
router.route("/new").post(ReviewsCtrl.apiPostReview);

// get the access to the reviews by the _id
router.route("/:id")
  .get(ReviewsCtrl.apiGetReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
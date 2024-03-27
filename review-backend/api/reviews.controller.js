// This controller gets information form the route, then does something with that information
import ReviewDAO from "../dao/reviewsDAO.js"; // used to get access to the database

export default class ReviewsController {
  // static means you can call this function without creating an instance of the class
  static async apiPostReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId); // The HTTP request has JSON file, and it's gonna have a movieId property
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewDAO.addReview(movieId, user, review);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {};
      let review = await ReviewDAO.getReview(id);
      if (!review) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(review);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id // get the parameters named id (:id)
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewDAO.updateReview(reviewId, user, review);
      
      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      // if nothing is changed
      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review")
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const reviewResponse = await ReviewDAO.deleteReview(reviewId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviews(req, res, next) {
    // Get a list of reviews of a movie
    try {
      let id = req.params.id || {};
      let review = await ReviewDAO.getReviewsByMovieId(id);
      if (!review) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(review);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}

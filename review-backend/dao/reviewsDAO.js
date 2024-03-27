import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId; // we need to create an object id to search for a specific review

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db("reviews").collection("reviews"); // reviews is a collection
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addReview(movieId, user, review) {
    try {
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review,
      };
      console.log("adding");
      return await reviews.insertOne(reviewDoc); // insertOne is mongodb command to insert a document
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async getReview(reviewId) {
    try {
      // The _id is a special field in MongoDB that is used to identify documents.
      // It is created automatically when a document is inserted into a collection.
      console.log("getting");
      return await reviews.findOne({ _id: new ObjectId(reviewId) });
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) }, // find the document with the given id
        { $set: { user: user, review: review } }, // update the document with the given id, this is a mongodb command
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId), // find and delete the document with the given id
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      // find all the documents with the given movieId
      // when we use find(), it'll return a cursor
      const cursor = await reviews.find({ movieId: parseInt(movieId) });
      return cursor.toArray(); // convert the cursor to an array
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }
}

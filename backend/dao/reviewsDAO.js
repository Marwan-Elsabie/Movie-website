import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db("reviews").collection("reviews");
        } catch (e) {
            console.error(`Unable to establish collection handles in ReviewsDAO: ${e}`);
        }
    }

    static async addReview(movieId, movieName, review, user) {
        try {
            const reviewDoc = {
                movieId: movieId.toString(),
                movieName: movieName,  // ✅ Store movie name
                user: user,
                review: review,
                date: new Date(),
            };
    
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({ _id: new ObjectId(reviewId) });
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            return await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user, review } }
            );
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId) {
        try {
            return await reviews.deleteOne({ _id: new ObjectId(reviewId) });
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({ movieId: parseInt(movieId) });  // ✅ Convert to number
            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to find reviews: ${e}`);
            return { error: e };
        }
    }
    
    
    
}

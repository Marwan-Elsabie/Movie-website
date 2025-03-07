import ReviewsDAO from "../dao/reviewsDAO.js";
import fetch from "node-fetch";


export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = parseInt(req.body.movieId)
            const { review, user } = req.body;

            const TMDB_API_KEY = "1d8d62b6c670c8865ec5ac919189f439"; 
            const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
            const movieResponse = await fetch(tmdbUrl);
            const movieData = await movieResponse.json();

            if (movieData.status_code === 34) {
                return res.status(404).json({ error: "Movie not found in TMDb" });
            }
            const movieName = movieData.title || "Unknown Movie";
            console.log(`📢 New Review Added for Movie: ${movieName} (ID: ${movieId})`);

            const reviewResponse = await ReviewsDAO.addReview(movieId,movieName,review, user);

            res.json({ status: "success", data: reviewResponse,movieName  });

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    static async apiGetReviews(req, res, next) {
        try {
            let movieId = req.params.id;  // ✅ Get movie ID from URL
            let reviews = await ReviewsDAO.getReviewsByMovieId(movieId); // ✅ Fetch reviews
    
            if (!reviews || reviews.length === 0) {
                return res.status(404).json({ error: "No reviews found for this movie." });
            }
    
            res.json(reviews); // ✅ Return reviews array
        } catch (e) {
            console.error(`apiGetReviews error: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }
    

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const { review, user } = req.body;
            const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);

            if (reviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update review - user may not be original poster");
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
            res.json({ status: "success", data: reviewResponse });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetReviews(req, res, next) {
        try {
            let movieId = req.params.id;
            let reviews = await ReviewsDAO.getReviewsByMovieId(movieId);
            res.json(reviews);
        } catch (e) {
            console.error(`apiGetReviews error: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }
}
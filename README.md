# Movie Review Website

This is a full-stack movie review website that allows users to browse popular movies, search for specific titles, and leave reviews. The project integrates The Movie Database (TMDb) API for movie data and includes a backend powered by Express and MongoDB.

## Features

### Frontend

- Displays popular movies fetched from TMDb API
- Search functionality for movies
- Movie detail page with reviews
- Responsive UI with clean styling

### Backend

- REST API for managing movie reviews
- MongoDB integration for storing reviews
- CRUD operations for adding, updating, and deleting reviews

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express, MongoDB
- **API:** TMDb API

## Installation

### Prerequisites

- Node.js installed
- MongoDB Atlas or local MongoDB instance
- TMDb API Key

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```
2. **Navigate to the project folder:**
   ```sh
   cd your-repo
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```

## Configuration

1. **Set up environment variables:** Create a `.env` file in the root directory and add:
   ```env
   MONGO_USERNAME=your_mongo_username
   MONGO_PASSWORD=your_mongo_password
   TMDB_API_KEY=your_tmdb_api_key
   ```

## Running the Project

### Start the Backend

```sh
node index.js
```

The backend will run on `http://localhost:8000/api/v1/reviews`.

### Start the Frontend

Open `index.html` in a web browser.

## File Structure

### Frontend

- `index.html` - Main page displaying popular movies
- `movie.html` - Movie details and reviews page
- `script.js` - Fetches and displays movie data
- `movie.js` - Fetches and displays movie reviews
- `style.css` - Website styling

### Backend

- `server.js` - Express server setup
- `index.js` - Database connection and server start
- `api/reviews.route.js` - API routes for reviews
- `dao/reviewsDAO.js` - MongoDB data access layer
- `api/reviews.controller.js` - Review management logic

## API Endpoints

- `GET /api/v1/reviews/movie/:id` - Fetch reviews for a specific movie
- `POST /api/v1/reviews/new` - Add a new review
- `PUT /api/v1/reviews/:id` - Update a review
- `DELETE /api/v1/reviews/:id` - Delete a review

## License

This project is open-source and free to use.

## Author

- **Marwan-Elsabie** 


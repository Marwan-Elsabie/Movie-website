const url = new URL(location.href);
const movieID = url.searchParams.get('id');
const movieTitle = url.searchParams.get('title');

const APILINK = 'http://localhost:8000/api/v1/reviews/';

const main = document.getElementById('section');
const title = document.getElementById('title');
title.innerHTML = movieTitle;

returnReviews(APILINK);

function returnReviews(url) {
    fetch(url + "movie/" + movieID)  // ✅ Correct API call to fetch reviews
    .then(res => res.json())
    .then(data => {
        console.log(data); // Debugging: Check what is returned
        main.innerHTML = ""; // Clear previous reviews

        data.forEach(review => {  // ✅ Corrected iteration
            const div_card = document.createElement("div");
            div_card.innerHTML = `
                <div class="row">
                    <div class="column">
                        <div class="card" id="${review._id}">
                            <p><strong>Review: </strong>${review.review}</p>
                            <p><strong>User: </strong>${review.user}</p>
                            <p>
                                <a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">✏️</a>
                                <a href="#" onclick="deleteReview('${review._id}')">🗑️</a>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            main.appendChild(div_card);
        });
    })
    .catch(error => console.error("Error fetching reviews:", error)); // ✅ Error handling
}



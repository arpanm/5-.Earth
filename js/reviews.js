document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('reviewFormModal');
    const writeReviewBtn = document.querySelector('.write-review-btn');
    const closeBtn = document.querySelector('.close-btn');
    const reviewForm = document.getElementById('reviewForm');
    const starRating = document.querySelector('.star-rating');
    const stars = starRating.querySelectorAll('.fa-star');
    let selectedRating = 0;

    // Modal Open/Close
    writeReviewBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        resetForm();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            resetForm();
        }
    });

    // Star Rating Interaction
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            updateStars(rating, 'hover');
        });

        star.addEventListener('mouseout', function() {
            updateStars(selectedRating, 'selected');
        });

        star.addEventListener('click', function() {
            selectedRating = this.dataset.rating;
            updateStars(selectedRating, 'selected');
        });
    });

    function updateStars(rating, state) {
        stars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
                star.classList.toggle('star-hover', state === 'hover');
            } else {
                star.classList.remove('fas', 'star-hover');
                star.classList.add('far');
            }
        });
    }

    // Form Submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedRating) {
            alert('Please select a rating');
            return;
        }

        const reviewContent = document.getElementById('reviewContent').value;
        if (reviewContent.length < 10) {
            alert('Review must be at least 10 characters long');
            return;
        }

        // Create new review
        const newReview = createReviewElement({
            rating: selectedRating,
            content: reviewContent,
            reviewer: 'You', // In a real app, this would come from the logged-in user
            date: 'Just now'
        });

        // Add to reviews list
        const reviewsList = document.querySelector('.reviews-list');
        reviewsList.insertBefore(newReview, reviewsList.firstChild);

        // Update reviews count and stats
        updateReviewStats(selectedRating);

        // Close modal and reset form
        modal.style.display = 'none';
        resetForm();
    });

    function createReviewElement(review) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <a href="user-profile.html"><img src="images/profile-man.avif" alt="Reviewer" class="reviewer-avatar"></a>
                    <div>
                        <a href="user-profile.html"><div class="reviewer-name">${review.reviewer}</div></a>
                        <div class="review-date">${review.date}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <div class="review-content">
                <p>${review.content}</p>
            </div>
        `;
        return reviewCard;
    }

    function generateStars(rating) {
        return Array(5).fill().map((_, index) => 
            `<i class="fa-star ${index < rating ? 'fas' : 'far'}"></i>`
        ).join('');
    }

    function updateReviewStats(rating) {
        // In a real app, this would make an API call and update all stats
        const totalReviews = document.querySelector('.rating-overview p');
        const currentCount = parseInt(totalReviews.textContent.match(/\d+/)[0]);
        totalReviews.textContent = `Based on ${currentCount + 1} reviews`;
    }

    function resetForm() {
        reviewForm.reset();
        selectedRating = 0;
        updateStars(0, 'selected');
    }
});
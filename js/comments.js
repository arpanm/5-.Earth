// Comments handling functionality
function initializeComments() {
    document.querySelectorAll('.action-btn').forEach(btn => {
        const commentIcon = btn.querySelector('.fa-comment');
        if (commentIcon) {
            btn.addEventListener('click', function() {
                const postCard = this.closest('.post-card');
                toggleCommentSection(postCard);
            });
        }
    });
}

function toggleCommentSection(postCard) {
    let commentsSection = postCard.querySelector('.comments-section');
    
    if (commentsSection) {
        // Toggle existing section
        commentsSection.classList.toggle('hidden');
        return;
    }

    // Create new comments section if it doesn't exist
    commentsSection = document.createElement('div');
    commentsSection.className = 'comments-section';
    
    // Add comment input area
    const commentInput = document.createElement('div');
    commentInput.className = 'comment-input-area';
    commentInput.innerHTML = `
        <img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar-small">
        <div class="comment-input-wrapper">
            <input type="text" placeholder="Write a comment..." class="comment-input">
            <button class="comment-submit-btn">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    `;

    // Add comments container
    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'comments-container';

    // Get post ID and load existing comments
    const postId = postCard.getAttribute('data-post-id');
    const post = posts.find(p => p.id === parseInt(postId));
    if (!post) {
        console.error(`Post with ID ${postId} not found!`);
        return;
    }
    if (post && post.stats && Array.isArray(post.stats.comments) && post.stats.comments.length > 0) {
        commentsContainer.innerHTML = post.stats.comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <a href="user-profile.html"><span class="comment-author">${comment.author}</span></a>
                    <span class="comment-time">${comment.timestamp}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
            </div>
        `).join('');
    }

    // Add event listener for new comment submission
    const input = commentInput.querySelector('.comment-input');
    const submitBtn = commentInput.querySelector('.comment-submit-btn');

    function handleCommentSubmit() {
        const commentText = input.value.trim();
        if (commentText) {
            const newComment = {
                id: Date.now(),
                text: commentText,
                author: currentUser.name,
                timestamp: new Date().toLocaleString()
            };

            // Initialize post.stats if undefined
            if (!post) {
                return;
            } else {
                if (!post.stats) {
                    post.stats = {};
                }
                if (!Array.isArray(post.stats.comments)) {
                    post.stats.comments = [];
                }
            }
            post.stats.comments.unshift(newComment);

            // Update UI
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.innerHTML = `
                <div class="comment-header">
                    <a href="user-profile.html"><span class="comment-author">${newComment.author}</span></a>
                    <span class="comment-time">${newComment.timestamp}</span>
                </div>
                <div class="comment-text">${newComment.text}</div>
            `;
            commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);

            // Update comment count
            const commentCountElement = postCard.querySelector('.action-btn .fa-comment').parentElement;
            commentCountElement.innerHTML = `<i class="far fa-comment"></i> ${post.stats.comments.length}`;

            // Clear input
            input.value = '';
        }
    }

    submitBtn.addEventListener('click', handleCommentSubmit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCommentSubmit();
        }
    });

    // Append all elements
    commentsSection.appendChild(commentInput);
    commentsSection.appendChild(commentsContainer);
    postCard.appendChild(commentsSection);
}

// Initialize comments when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeComments);
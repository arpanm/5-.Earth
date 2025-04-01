document.addEventListener('DOMContentLoaded', function() {
    // Get community ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const communityId = urlParams.get('id');

    // Elements
    const joinCommunityBtn = document.querySelector('.join-community-btn');
    const feedFilters = document.querySelectorAll('.feed-filters .filter-btn');
    const postTypeButtons = document.querySelectorAll('.post-type-btn');
    const postEditors = document.querySelectorAll('.post-editor');
    const postSubmitBtn = document.querySelector('.primary-btn');

    // Check if elements exist before adding event listeners
    if (!joinCommunityBtn || !postSubmitBtn || postTypeButtons.length === 0 || postEditors.length === 0) {
        console.warn('Some required elements are missing in the DOM');
        return;
    }

    // Sample community data (replace with API call)
    const communityData = {
        id: 1,
        name: 'Green Earth Warriors',
        members: 1200,
        joined: false
    };

    // Toggle join community button
    function toggleJoinButton() {
        if (communityData.joined) {
            joinCommunityBtn.innerHTML = '<i class="fas fa-check"></i> Joined';
            joinCommunityBtn.classList.add('joined');
        } else {
            joinCommunityBtn.innerHTML = '<i class="fas fa-plus"></i> Join Community';
            joinCommunityBtn.classList.remove('joined');
        }
    }

    // Handle join community
    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener('click', function() {
            communityData.joined = !communityData.joined;
            toggleJoinButton();
            // Add API call to update membership status
        });
    }

    // Handle feed filters
    if (feedFilters.length > 0) {
        feedFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                feedFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                filterFeedPosts(this.textContent.trim());
            });
        });
    }

    // Handle post type selection
    postTypeButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            postTypeButtons.forEach(btn => btn.classList.remove('active'));
            postEditors.forEach(editor => editor.classList.remove('active'));
            
            this.classList.add('active');
            postEditors[index].classList.add('active');
        });
    });

    // Handle post submission
    postSubmitBtn.addEventListener('click', function() {
        const activeEditor = document.querySelector('.post-editor.active');
        const content = activeEditor.querySelector('textarea').value;
        
        if (content.trim()) {
            createNewPost(content);
            activeEditor.querySelector('textarea').value = '';
        }
    });

    // Handle like, comment, and share actions
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').classList.contains('fa-heart') ? 'like' :
                          this.querySelector('i').classList.contains('fa-comment') ? 'comment' : 'share';
            
            handlePostAction(action, this);
        });
    });

    // Handle comment submission
    document.querySelectorAll('.comment-submit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const commentInput = this.parentElement.querySelector('.comment-input');
            const comment = commentInput.value.trim();
            
            if (comment) {
                submitComment(comment, this.closest('.feed-post'));
                commentInput.value = '';
            }
        });
    });

    // Function to filter feed posts
    function filterFeedPosts(filterType) {
        const posts = document.querySelectorAll('.feed-post');
        // Add actual filtering logic based on post types
        console.log(`Filtering posts by: ${filterType}`);
    }

    // Function to create new post
    function createNewPost(content) {
        const newPost = document.createElement('div');
        newPost.className = 'feed-post';
        newPost.innerHTML = `
            <div class="post-header">
                <img src="images/profile-man.avif" alt="User" class="user-avatar">
                <div class="post-meta">
                    <a href="#" class="user-name">Current User</a>
                    <div class="post-time">Just now</div>
                </div>
            </div>
            <div class="post-content">
                <p>${content}</p>
            </div>
            <div class="post-actions">
                <button class="action-btn">
                    <i class="far fa-heart"></i>
                    <span>0</span>
                </button>
                <button class="action-btn">
                    <i class="far fa-comment"></i>
                    <span>0</span>
                </button>
                <button class="action-btn">
                    <i class="far fa-share-square"></i>
                    <span>Share</span>
                </button>
            </div>
            <div class="comments-section">
                <div class="comment-input-area">
                    <img src="images/profile-woman.png" alt="User" class="user-avatar-small">
                    <div class="comment-input-wrapper">
                        <input type="text" class="comment-input" placeholder="Write a comment...">
                        <button class="comment-submit-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.feed-posts').prepend(newPost);
        attachPostEventListeners(newPost);
    }

    // Function to handle post actions (like, comment, share)
    function handlePostAction(action, button) {
        switch(action) {
            case 'like':
                const icon = button.querySelector('i');
                const count = button.querySelector('span');
                if (icon.classList.contains('far')) {
                    icon.classList.replace('far', 'fas');
                    count.textContent = parseInt(count.textContent) + 1;
                } else {
                    icon.classList.replace('fas', 'far');
                    count.textContent = parseInt(count.textContent) - 1;
                }
                break;
            case 'comment':
                const commentsSection = button.closest('.feed-post').querySelector('.comments-section');
                commentsSection.classList.toggle('hidden');
                break;
            case 'share':
                // Implement share functionality
                console.log('Share post');
                break;
        }
    }

    // Function to submit a comment
    function submitComment(comment, post) {
        const commentsList = post.querySelector('.comments-section .comments-container') ||
            createCommentsContainer(post);

        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
            <div class="comment-header">
                <img src="images/profile-woman.png" alt="User" class="user-avatar-small">
                <span class="comment-author">Current User</span>
                <span class="comment-time">Just now</span>
            </div>
            <div class="comment-text">${comment}</div>
        `;

        commentsList.appendChild(newComment);
    }

    // Function to create comments container
    function createCommentsContainer(post) {
        const container = document.createElement('div');
        container.className = 'comments-container';
        post.querySelector('.comments-section').appendChild(container);
        return container;
    }

    // Function to attach event listeners to new posts
    function attachPostEventListeners(post) {
        post.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.querySelector('i').classList.contains('fa-heart') ? 'like' :
                              this.querySelector('i').classList.contains('fa-comment') ? 'comment' : 'share';
                handlePostAction(action, this);
            });
        });

        const commentBtn = post.querySelector('.comment-submit-btn');
        if (commentBtn) {
            commentBtn.addEventListener('click', function() {
                const commentInput = this.parentElement.querySelector('.comment-input');
                const comment = commentInput.value.trim();
                if (comment) {
                    submitComment(comment, post);
                    commentInput.value = '';
                }
            });
        }
    }

    // Initialize the page
    toggleJoinButton();
});
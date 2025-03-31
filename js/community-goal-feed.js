// Community Goal Feed Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Function to create a community goal post card
    function createCommunityGoalPostCard(post) {
        const progressPercentage = (post.currentParticipants / post.targetParticipants) * 100;
        const isJoined = post.participants.includes('current-user-id');
        
        return `
            <div class="post-card community-goal-post" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-meta">
                        <img src="${post.creatorAvatar || 'images/profile-placeholder.jpg'}" alt="${post.creatorName}" class="user-avatar">
                        <div class="post-info">
                            <h3>${post.title}</h3>
                            <span class="post-timestamp">${new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="post-category">
                        <i class="fas fa-users"></i> Community Goal
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.description}</p>
                    <div class="goal-details">
                        <div class="goal-stat">
                            <i class="fas fa-users"></i>
                            <span>${post.currentParticipants}/${post.targetParticipants} Participants</span>
                        </div>
                        <div class="goal-stat">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${post.location}</span>
                        </div>
                        <div class="goal-stat">
                            <i class="fas fa-calendar"></i>
                            <span>${new Date(post.startDate).toLocaleDateString()} - ${new Date(post.endDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="goal-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                        </div>
                        <span class="progress-text">${Math.round(progressPercentage)}% of target participants</span>
                    </div>
                </div>
                <div class="post-actions">
                    ${!isJoined ? 
                        `<button class="join-btn primary-btn" onclick="joinCommunityGoal('${post.id}')">Join Initiative</button>` :
                        `<button class="joined-btn" disabled>Joined</button>`
                    }
                    <div class="social-actions">
                        <button class="action-btn" onclick="likePost('${post.id}')"><i class="far fa-heart"></i> Like</button>
                        <button class="action-btn" onclick="showComments('${post.id}')"><i class="far fa-comment"></i> Comment</button>
                        <button class="action-btn" onclick="sharePost('${post.id}')"><i class="fas fa-share"></i> Share</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to join a community goal
    window.joinCommunityGoal = function(postId) {
        // Here you would typically make an API call to join the goal
        console.log('Joining community goal:', postId);
        
        // For demo purposes, we'll just update the UI
        const postElement = document.querySelector(`.community-goal-post[data-post-id="${postId}"]`);
        const joinBtn = postElement.querySelector('.join-btn');
        
        joinBtn.textContent = 'Joined';
        joinBtn.classList.remove('join-btn', 'primary-btn');
        joinBtn.classList.add('joined-btn');
        joinBtn.disabled = true;

        // Update the participants count
        const participantsElement = postElement.querySelector('.goal-stat span');
        const [current, target] = participantsElement.textContent.split('/').map(num => parseInt(num.trim()));
        participantsElement.textContent = `${current + 1}/${target} Participants`;

        // Update the progress bar
        const newProgress = ((current + 1) / target) * 100;
        const progressBar = postElement.querySelector('.progress-fill');
        const progressText = postElement.querySelector('.progress-text');
        progressBar.style.width = `${newProgress}%`;
        progressText.textContent = `${Math.round(newProgress)}% of target participants`;

        // Show success message
        alert('Successfully joined the community goal!');
    };

    // Mock function to like a post
    window.likePost = function(postId) {
        console.log('Liking post:', postId);
        const likeBtn = document.querySelector(`[data-post-id="${postId}"] .fa-heart`);
        likeBtn.classList.toggle('far');
        likeBtn.classList.toggle('fas');
    };

    // Mock function to show comments
    window.showComments = function(postId) {
        console.log('Showing comments for post:', postId);
        // Implement comment functionality
    };

    // Mock function to share post
    window.sharePost = function(postId) {
        console.log('Sharing post:', postId);
        // Implement share functionality
    };
});
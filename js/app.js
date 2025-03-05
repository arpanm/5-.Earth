document.addEventListener('DOMContentLoaded', () => {
    const postBtn = document.getElementById('post-btn');
    const postsContainer = document.querySelector('.posts-container');
    const textarea = document.querySelector('textarea');
    
    // Sample posts data with sustainability metrics
    let posts = [];

    // Only add event listeners if elements exist
    if (textarea) {
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handlePostCreation();
            }
        });
    }

    // Post creation functionality - only add if button exists
    if (postBtn) {
        postBtn.addEventListener('click', handlePostCreation);
    }

    function handlePostCreation() {
        const postContent = textarea.value;
        if (postContent.trim() !== '') {
            createPost(postContent);
            textarea.value = '';
            // Add animation effect
            textarea.style.borderColor = 'var(--success-color)';
            setTimeout(() => {
                textarea.style.borderColor = '#ddd';
            }, 1000);
        }
    }

    function createPost(content) {
        const post = {
            id: Date.now(),
            content: content,
            likes: 0,
            comments: [],
            timestamp: new Date().toLocaleString(),
            author: 'Current User', // In a real app, this would come from user authentication
            sustainabilityScore: calculateSustainabilityScore(content),
            tags: extractEnvironmentalTags(content)
        };

        posts.unshift(post);
        renderPosts();
        animateNewPost();
    }

    function calculateSustainabilityScore(content) {
        // Simple scoring based on keywords (in a real app, this would be more sophisticated)
        const sustainabilityKeywords = ['recycle', 'sustainable', 'green', 'eco', 'environment', 'renewable', 'conservation'];
        return sustainabilityKeywords.reduce((score, keyword) => {
            return score + (content.toLowerCase().includes(keyword) ? 1 : 0);
        }, 0);
    }

    function extractEnvironmentalTags(content) {
        const tags = [];
        const commonTags = {
            'recycling': ['recycle', 'waste', 'plastic'],
            'energy': ['solar', 'renewable', 'wind'],
            'conservation': ['wildlife', 'forest', 'biodiversity'],
            'climate': ['climate', 'carbon', 'emission'],
            'water': ['water', 'ocean', 'marine']
        };

        Object.entries(commonTags).forEach(([category, keywords]) => {
            if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
                tags.push(category);
            }
        });

        return tags;
    }

    function renderPosts() {
        if (!postsContainer) return; // Guard clause to prevent TypeError
        postsContainer.innerHTML = posts.map(post => `
            <div class="post-container" data-post-id="${post.id}">
                <div class="post-header">
                    <strong>${post.author}</strong>
                    <span>${post.timestamp}</span>
                </div>
                <div class="post-content">
                    ${post.content}
                    ${renderTags(post.tags)}
                    ${renderSustainabilityScore(post.sustainabilityScore)}
                </div>
                <div class="post-actions">
                    <button onclick="window.handleLike(${post.id})">
                        <i class="fas fa-heart"></i>
                        <span>${post.likes}</span>
                    </button>
                    <button onclick="window.handleComment(${post.id})">
                        <i class="fas fa-comment"></i>
                        <span>${post.comments.length}</span>
                    </button>
                    <button onclick="window.handleShare(${post.id})">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    function renderTags(tags) {
        if (!tags.length) return '';
        return `
            <div class="post-tags">
                ${tags.map(tag => `<span class="tag">#${tag}</span>`).join(' ')}
            </div>
        `;
    }

    function renderSustainabilityScore(score) {
        const leaves = '🌿'.repeat(Math.min(score, 5));
        return score > 0 ? `
            <div class="sustainability-score" title="Sustainability Impact Score">
                ${leaves}
            </div>
        ` : '';
    }

    function animateNewPost() {
        const firstPost = postsContainer.firstElementChild;
        if (firstPost) {
            firstPost.style.opacity = '0';
            firstPost.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                firstPost.style.transition = 'all 0.3s ease';
                firstPost.style.opacity = '1';
                firstPost.style.transform = 'translateY(0)';
            }, 50);
        }
    }

    // Global handlers for post interactions
    window.handleLike = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            renderPosts();
        }
    };

    window.handleComment = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            const comment = prompt('Add your comment:');
            if (comment?.trim()) {
                post.comments.push({
                    id: Date.now(),
                    text: comment,
                    author: 'Current User',
                    timestamp: new Date().toLocaleString()
                });
                renderPosts();
            }
        }
    };

    window.handleShare = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            // In a real app, this would open a share dialog
            alert('Sharing functionality would be implemented here!');
        }
    };

    // Initial render
    renderPosts();
});

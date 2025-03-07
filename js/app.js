// Function to toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Function to show modal
function showModal() {
    const modal = document.getElementById('registerModal');
    new bootstrap.Modal(modal).show();
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('registerModal');
    bootstrap.Modal.getInstance(modal).hide();
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('registerModal');
    if (event.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal on escape key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Function to handle registration form submission
function handleRegistration(event) {
    event.preventDefault();
    
    // Get form elements
    const form = event.target;
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const interests = Array.from(form.querySelectorAll('input[name="interests[]"]:checked')).map(checkbox => checkbox.value);
    const terms = form.terms.checked;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('active');
        error.style.display = 'none';
    });
    
    // Validate form
    let isValid = true;
    
    if (fullName.length < 2) {
        const nameError = document.getElementById('nameError');
        nameError.textContent = 'Please enter a valid name';
        nameError.classList.add('active');
        nameError.style.display = 'block';
        isValid = false;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        const emailError = document.getElementById('emailError');
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('active');
        emailError.style.display = 'block';
        isValid = false;
    }
    
    if (password.length < 8) {
        const passwordError = document.getElementById('passwordError');
        passwordError.textContent = 'Password must be at least 8 characters long';
        passwordError.classList.add('active');
        passwordError.style.display = 'block';
        isValid = false;
    }
    
    if (!terms) {
        const termsError = document.getElementById('termsError');
        if (termsError) {
            termsError.textContent = 'Please accept the terms and conditions';
            termsError.classList.add('active');
            termsError.style.display = 'block';
        }
        return;
    }
    
    if (isValid) {
        // Here you would typically send the data to your backend
        console.log('Registration data:', { fullName, email, interests });
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Registration successful! Welcome to 5%.Earth';
        form.appendChild(successMessage);
        
        // Close modal and reset form after a short delay
        setTimeout(() => {
            closeModal();
            form.reset();
            successMessage.remove();
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener to Join Now buttons
    const joinButtons = document.querySelectorAll('.primary-btn');
    joinButtons.forEach(button => {
        if (button.textContent.trim() === 'Join Now') {
            button.addEventListener('click', showModal);
        }
    });
    
    // Tab switching functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const postContent = document.querySelector('.activity-content');

    if (filterBtns && postContent) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                // Hide all content first
                const allPosts = postContent.querySelectorAll('.post-item');
                const allMentions = postContent.querySelectorAll('.mention-item');
                const allSaved = postContent.querySelectorAll('.saved-item');

                allPosts.forEach(post => post.style.display = 'none');
                allMentions.forEach(mention => mention.style.display = 'none');
                allSaved.forEach(saved => saved.style.display = 'none');

                // Show relevant content based on selected tab
                if (this.textContent === 'My Posts') {
                    allPosts.forEach(post => post.style.display = 'block');
                } else if (this.textContent === 'Mentions') {
                    allMentions.forEach(mention => mention.style.display = 'block');
                } else if (this.textContent === 'Saved') {
                    allSaved.forEach(saved => saved.style.display = 'block');
                }
            });
        });

        // Show My Posts by default
        const defaultTab = document.querySelector('.filter-btn.active');
        if (defaultTab) {
            defaultTab.click();
        }
    }
});

// Sample post data - In a real app, this would come from an API
const posts = [
    {
        id: 1,
        author: {
            name: 'Sarah Johnson',
            avatar: 'images/profile-woman.png',
            timeAgo: '2 hours ago'
        },
        type: 'quick-post',
        content: 'Just witnessed an amazing community cleanup at Brighton Beach! 🌊 Over 50 volunteers came together to collect plastic waste. Small actions, big impact! #OceanCleanup #Sustainability',
        image: 'images/ocean-clan.webp',
        stats: {
            likes: 128,
            comments: [
                {
                    id: 101,
                    text: 'This is amazing! We need more initiatives like this.',
                    author: 'John Smith',
                    timestamp: '2023-12-10 14:30:00'
                },
                {
                    id: 102,
                    text: 'I would love to join next time! When is the next cleanup?',
                    author: 'Emma Davis',
                    timestamp: '2023-12-10 15:15:00'
                }
            ]
        }
    },
    {
        id: 2,
        author: {
            name: 'Green Tech Solutions',
            avatar: 'images/profile-man.avif',
            timeAgo: '1 day ago'
        },
        type: 'blog',
        title: 'Revolutionary Solar Panel Technology Breakthrough',
        content: 'Our team has developed a new solar panel coating that increases efficiency by 35% while reducing production costs. This breakthrough could make solar energy more accessible to communities worldwide...',
        image: 'images/green-tech.jpeg',
        stats: {
            likes: 342,
            comments: [
                {
                    id: 201,
                    text: 'This is groundbreaking! How soon until this technology is available?',
                    author: 'Tech Enthusiast',
                    timestamp: '2023-12-09 10:00:00'
                },
                {
                    id: 202,
                    text: 'Great innovation! Would love to see this implemented in developing countries.',
                    author: 'Global Impact',
                    timestamp: '2023-12-09 11:30:00'
                }
            ]
        }
    },
    {
        id: 3,
        author: {
            name: 'EcoAware Initiative',
            avatar: 'images/profile-woman-2.avif',
            timeAgo: '2 days ago'
        },
        type: 'poll',
        title: 'Which sustainable practice do you find most effective?',
        pollOptions: [
            { text: 'Composting', percentage: 45 },
            { text: 'Solar Panels', percentage: 30 },
            { text: 'Rain Water Harvesting', percentage: 15 },
            { text: 'Electric Vehicles', percentage: 10 }
        ],
        pollStats: '1,234 votes • 2 days left',
        stats: {
            likes: 892,
            comments: [
                {
                    id: 301,
                    text: 'All of these are important, but composting is often overlooked!',
                    author: 'Green Thumb',
                    timestamp: '2023-12-08 09:45:00'
                },
                {
                    id: 302,
                    text: 'Electric vehicles are the future, but we need better infrastructure.',
                    author: 'Future Driver',
                    timestamp: '2023-12-08 10:20:00'
                }
            ]
        }
    }
];

const currentUser = {
    name: 'Rik Pant',
    avatar: 'images/profile-man.avif',
    timeAgo: 'Online'
};

const postBtn = document.getElementById('post-btn');
const postsContainer = document.querySelector('.posts-container');
const textarea = document.querySelector('textarea');

document.addEventListener('DOMContentLoaded', () => {
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

    // Initialize the posts when the page loads
    initializePosts();
});

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
        stats: {
            likes: 0,
            comments: []
        },
        timestamp: new Date().toLocaleString(),
        author: currentUser, // In a real app, this would come from user authentication
        sustainabilityScore: calculateSustainabilityScore(content),
        tags: extractEnvironmentalTags(content)
    };

    // Add new post to the beginning of the posts array
    posts.unshift(post);
    
    // Only update the new post in the DOM
    const postsContainer = document.querySelector('.posts-container');
    if (postsContainer) {
        const postElement = document.createElement('div');
        postElement.className = 'post-container';
        postElement.setAttribute('data-post-id', post.id);
        postElement.appendChild(createPostCard(post));
        
        // Insert the new post at the beginning of the container
        if (postsContainer.firstChild) {
            postsContainer.insertBefore(postElement, postsContainer.firstChild);
        } else {
            postsContainer.appendChild(postElement);
        }
        
        // Animate the new post
        animateNewPost();
    }
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

// Function to create a post card element
function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'post-card';

    let count = 0;
    if (post.stats && post.stats.comments) {
        count = post.stats.comments.length;
    }

    article.innerHTML = `
        <div class="post-header">
            <a href="user-profile.html"><img src="${post.author.avatar}" alt="${post.author.name}" class="user-avatar"></a>
            <div class="post-meta">
                <a href="user-profile.html"><h3 class="user-name">${post.author.name}</h3></a>
                <span class="post-time">${post.author.timeAgo}</span>
            </div>
            <span class="post-type"><i class="fas ${getPostTypeIcon(post.type)}"></i> ${formatPostType(post.type)}</span>
        </div>
        ${getPostContent(post)}
        <div class="post-actions">
            <button class="action-btn"><i class="far fa-heart"></i> ${post.stats?.likes || 0}</button>
            <button class="action-btn"><i class="far fa-comment"></i> ${count}</button>
            <button class="action-btn"><i class="far fa-share-square"></i> Share</button>
        </div>
    `;

    article.setAttribute('data-post-id', post.id);

    return article;
}

// Helper function to get post type icon
function getPostTypeIcon(type) {
    const icons = {
        'quick-post': 'fa-bolt',
        'blog': 'fa-blog',
        'media': 'fa-photo-video',
        'poll': 'fa-poll',
        'event': 'fa-calendar-alt'
    };
    return icons[type] || 'fa-bolt';
}

// Helper function to format post type display text
function formatPostType(type) {
    if (!type) return 'Post';
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Helper function to generate post content based on type
function getPostContent(post) {
    switch(post.type) {
        case 'blog':
            return `
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p class="post-excerpt">${post.content}</p>
                    ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ''}
                    <button class="read-more-btn">Read More</button>
                </div>
            `;
        case 'poll':
            return `
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <div class="poll-options">
                        ${post.pollOptions.map(option => `
                            <div class="poll-option">
                                <div class="poll-bar" style="width: ${option.percentage}%;">${option.text} (${option.percentage}%)</div>
                            </div>
                        `).join('')}
                    </div>
                    <p class="poll-stats">${post.pollStats}</p>
                </div>
            `;
        default:
            return `
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : ''}
                </div>
            `;
    }
}

// Initialize posts container
function initializePosts() {
    const postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) return;

    // Clear existing content
    postsContainer.innerHTML = '';

    // Add posts
    const allPosts = [...posts];
    allPosts.forEach(post => {
        postsContainer.appendChild(createPostCard(post));
    });

    // Initialize post interactions
    initializePostInteractions();
}

function renderPosts() {
    const postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) return;

    // Clear existing content
    postsContainer.innerHTML = '';

    // Add posts
    posts.forEach(post => {
        postsContainer.appendChild(createPostCard(post));
    });

    // Re-initialize post interactions after rendering
    initializePostInteractions();
}

// Initialize post interactions
function initializePostInteractions() {
    // Like button functionality
    document.querySelectorAll('.action-btn').forEach(btn => {
        const heartIcon = btn.querySelector('.fa-heart');
        if (heartIcon) {
            btn.addEventListener('click', function() {
                if (heartIcon.classList.contains('far')) {
                    heartIcon.classList.replace('far', 'fas');
                    const likes = parseInt(this.textContent) + 1;
                    this.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;
                } else {
                    heartIcon.classList.replace('fas', 'far');
                    const likes = parseInt(this.textContent) - 1;
                    this.innerHTML = `<i class="far fa-heart"></i> ${likes}`;
                }
            });
        }
    });
}

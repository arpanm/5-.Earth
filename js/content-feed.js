

// Initialize content grid
function initializeContentFeed() {
    initializeFilters();
}

// Render content cards
function renderContent(content) {
    const contentGrid = document.querySelector('.content-grid');
    contentGrid.innerHTML = content.map(item => `
        <article class="content-card">
            ${item.image ? `<img src="${item.image}" alt="Content" class="content-image">` : ''}
            <div class="content-body">
                <span class="content-type">${item.type}</span>
                <h3 class="content-title">${item.title}</h3>
                ${item.type === 'poll' ? `<div class="poll-options">
                        ${item.pollOptions.map(option => `
                            ${option ? `<div class="poll-option">
                                <div class="poll-bar" style="width: ${option.percentage ? option.percentage : 0 }%;">${option.text ? option.text : option} (${option.percentage ? option.percentage : 0}%)</div>
                            </div>` : ''}
                        `).join('')}
                    </div>` : 
                item.type === 'goal' ? `
                    <div class="goal-content">
                        <div class="goal-category"><i class="fas fa-tag"></i> ${item.category}</div>
                        <p class="goal-description">${item.description}</p>
                        <div class="goal-metrics">
                            <div class="metric-item">
                                <i class="fas fa-bullseye"></i>
                                <span>Target: ${item.target} ${item.metric}</span>
                            </div>
                            <div class="metric-item">
                                <i class="fas fa-calendar"></i>
                                <span>Timeline: ${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="goal-milestones">
                            <h4>Key Milestones:</h4>
                            <p>${item.milestones}</p>
                        </div>
                    </div>
                ` : `<p class="content-preview">${item.content}</p>`}
                <div class="content-meta">
                    <div class="content-author">
                        <a href="${item.author.profile}">
                            <img src="${item.author.avatar}" alt="Author" class="author-avatar">
                            <span>${item.author.name}</span>
                        </a>
                    </div>
                    <div class="content-interactions">
                        <button class="like-btn">❤️ ${item.stats.likes} Likes</button>
                        <button class="comment-btn">💬 ${item.stats.comments.length} Comments</button>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}

// Initialize filter buttons
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Apply filter
            const filterType = button.dataset.filter;
            filterContent(filterType);
        });
    });

    // Initialize sort functionality
    const sortSelect = document.getElementById('feed-sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            filterContent(activeFilter);
        });
    }
    if (document.getElementById('all-content-filter')) {
        document.getElementById('all-content-filter').click();
    }
}

// Filter content based on type
function filterContent(filterType) {
    let filteredContent;
    const sortType = document.getElementById('feed-sort-select') ? document.getElementById('feed-sort-select').value : 'recent';
    let renderType = 'list';
    
    // Apply filters
    switch(filterType) {
        case 'all':
            filteredContent = posts;
            break;
        case 'following':
            // In a real app, this would filter based on followed users
            filteredContent = posts.filter(item => [2, 3].includes(item.author.id));
            break;
        case 'trending':
            filteredContent = posts.filter(item => item.trending);
            break;
        case 'my-posts':
            filteredContent = posts.filter(item => item.author.id === currentUser.id);
            break;
        case 'all-recent':
            filteredContent = posts.slice(0, 6);
            renderType = 'grid';
            break;
        case 'blog-recent':
            filteredContent = posts.filter(item => item.type === "blog").slice(0, 6);
            renderType = 'grid';
            break;
        case 'quick-post-recent':
            filteredContent = posts.filter(item => item.type === "quick-post").slice(0, 6);
            renderType = 'grid';
            break;
        case 'poll-recent':
            filteredContent = posts.filter(item => item.type === "poll").slice(0, 6);
            renderType = 'grid';
            break;
        case 'media-recent':
            filteredContent = posts.filter(item => item.type === "media").slice(0, 6);
            renderType = 'grid';
            break;
        default:
            filteredContent = posts;
    }

    // Apply sorting
    switch(sortType) {
        case 'recent':
            filteredContent.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            break;
        case 'popular':
            filteredContent.sort((a, b) => b.likes - a.likes);
            break;
        case 'impact':
            filteredContent.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
            break;
    }
    
    renderType === "list" ? renderPosts(filteredContent) : renderContent(filteredContent);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContentFeed);
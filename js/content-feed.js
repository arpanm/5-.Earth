

// Initialize content grid
function initializeContentFeed() {
    initializeFilters();
    initializeFilterTags();
}

// Initialize filter tag buttons
function initializeFilterTags() {
    const filterTagButtons = document.querySelectorAll('.filter-tag-btn');
    
    filterTagButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            filterContent(activeFilter);
        });
    });
}

// Render content cards across three sections
function renderContent(content) {
    const firstSection = document.querySelector('.content-grid.first-section');
    const middleSection = document.querySelector('.content-grid.middle-section');
    const lastSection = document.querySelector('.content-grid.last-section');
    
    // Split content into three parts
    const firstPart = content.slice(0, Math.floor(content.length * 0.3));
    const middlePart = content.slice(Math.floor(content.length * 0.3), Math.floor(content.length * 0.7));
    const lastPart = content.slice(Math.floor(content.length * 0.7));
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
    const filterTagButtons = document.querySelectorAll('.filter-tag-btn');
    
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

    // Initialize filter tag buttons (goal types and action types)
    filterTagButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active class on clicked button
            button.classList.toggle('active');
            
            // Get current active main filter
            // const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            // filterContent(activeFilter);
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
    
    // Get smart filter values from active filter tag buttons
    const selectedGoals = Array.from(document.querySelectorAll('#goalTypeFilter .filter-tag-btn.active')).map(btn => btn.dataset.value);
    const selectedActionTypes = Array.from(document.querySelectorAll('#actionTypeFilter .filter-tag-btn.active')).map(btn => btn.dataset.value);
    
    // Apply filters
    switch(filterType) {
        case 'all':
            filteredContent = posts;
            break;
        case 'following':
            filteredContent = posts.filter(item => [2, 3].includes(item.author.id));
            break;
        case 'trending':
            filteredContent = posts.filter(item => item.trending);
            break;
        case 'my-posts':
            filteredContent = posts.filter(item => item.author.id === currentUser.id);
            break;
        default:
            filteredContent = posts;
    }

    // Apply smart filters if selected
    // if (selectedGoals.length > 0) {
    //     filteredContent = filteredContent.filter(item =>
    //         item.goals?.some(goal => selectedGoals.includes(goal)) ||
    //         (item.type === 'goal' && selectedGoals.includes(item.category))
    //     );
    // }

    // if (selectedActionTypes.length > 0) {
    //     filteredContent = filteredContent.filter(item =>
    //         item.actionTypes?.some(action => selectedActionTypes.includes(action)) ||
    //         selectedActionTypes.includes(item.type)
    //     );
    // }

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

// Initialize smart filters
function initializeSmartFilters() {
    const applyFiltersBtn = document.getElementById('applySmartFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            filterContent(activeFilter);
        });
    }
}

// Update initialize function to include smart filters
function initializeContentFeed() {
    initializeFilters();
    initializeSmartFilters();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContentFeed);
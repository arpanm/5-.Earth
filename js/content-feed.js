// Mock content data
const contentData = [
    {
        type: 'Blog Post',
        title: 'Revolutionizing Waste Management',
        preview: 'Discover how our new recycling initiative is transforming the way we handle waste...',
        image: 'images/waste-management.webp',
        author: {
            name: 'Sarah Jain',
            avatar: 'images/profile-woman.png',
            profile: 'user-profile.html'
        }
    },
    {
        type: 'Quick Posts',
        title: 'Solar Panel Installation Tips',
        preview: 'Quick guide on maximizing solar panel efficiency through proper installation...',
        image: 'images/solar-solutions.jpg',
        author: {
            name: 'Mike Chen',
            avatar: 'images/profile-man.avif',
            profile: 'user-profile.html'
        }
    },
    {
        type: 'Media',
        title: 'Ocean Cleanup Documentary',
        preview: 'Watch our latest documentary on innovative ocean cleanup technologies...',
        image: 'images/ocean-conservation.avif',
        author: {
            name: 'Emma Wilson',
            avatar: 'images/profile-woman-2.avif',
            profile: 'user-profile.html'
        }
    },
    {
        type: 'Events',
        title: 'Earth Day Celebration 2024',
        preview: 'Join us for a day of environmental awareness and community action...',
        image: 'images/green-earth.jpg',
        author: {
            name: 'David Park',
            avatar: 'images/profile-man.avif',
            profile: 'user-profile.html'
        }
    },
    {
        type: 'Polls',
        title: 'Community Green Initiative',
        preview: 'Vote on the next environmental project for our community...',
        image: 'images/green-project-placeholder.jpg',
        author: {
            name: 'Lisa Thompson',
            avatar: 'images/profile-woman.png',
            profile: 'user-profile.html'
        }
    }
];

// Initialize content grid
function initializeContentFeed() {
    renderContent(contentData);
    initializeFilters();
}

// Render content cards
function renderContent(content) {
    const contentGrid = document.querySelector('.content-grid');
    contentGrid.innerHTML = content.map(item => `
        <article class="content-card">
            <img src="${item.image}" alt="Content" class="content-image">
            <div class="content-body">
                <span class="content-type">${item.type}</span>
                <h3 class="content-title">${item.title}</h3>
                <p class="content-preview">${item.preview}</p>
                <div class="content-meta">
                    <div class="content-author">
                        <a href="${item.author.profile}">
                            <img src="${item.author.avatar}" alt="Author" class="author-avatar">
                            <span>${item.author.name}</span>
                        </a>
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
            const filterType = button.textContent.trim();
            filterContent(filterType);
        });
    });
}

// Filter content based on type
function filterContent(filterType) {
    let filteredContent;
    
    if (filterType === 'All') {
        filteredContent = contentData;
    } else {
        filteredContent = contentData.filter(item => item.type === filterType);
    }
    
    renderContent(filteredContent);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContentFeed);
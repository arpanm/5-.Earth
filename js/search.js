// Mock data for demonstration - replace with actual data fetching
const mockData = {
    posts: [
        { id: 1, title: 'Sustainable Living Tips', content: 'Learn how to reduce your carbon footprint' },
        { id: 2, title: 'Green Energy Revolution', content: 'The future of renewable energy' }
    ],
    users: [
        { id: 1, name: 'John Eco', bio: 'Environmental activist' },
        { id: 2, name: 'Sarah Green', bio: 'Sustainability consultant' }
    ],
    organizations: [
        { id: 1, name: 'EcoTech Solutions', description: 'Innovative green technology' },
        { id: 2, name: 'Green Earth Initiative', description: 'Environmental conservation' }
    ],
    'green projects': [
        { id: 1, name: 'Urban Forest', description: 'City reforestation project' },
        { id: 2, name: 'Solar Community', description: 'Community solar power initiative' }
    ],
    events: [
        { id: 1, name: 'Earth Day Celebration', description: 'Annual environmental awareness event' },
        { id: 2, name: 'Green Tech Expo', description: 'Sustainable technology showcase' }
    ]
};

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) {
        console.error('Search elements not found');
        return;
    }

    // Create search results container if it doesn't exist
    if (!document.getElementById('search-results')) {
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results';
        resultsContainer.className = 'search-results-container';
        searchInput.parentNode.appendChild(resultsContainer);
    }

    searchInput.addEventListener('input', debounce(handleSearch, 300));
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle search input
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');

    if (searchTerm.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }

    const results = searchAllContent(searchTerm);
    displayResults(results, searchTerm);
}

// Search through all content types
function searchAllContent(searchTerm) {
    const results = {};
    
    for (const [type, items] of Object.entries(mockData)) {
        results[type] = items.filter(item => {
            const searchableText = [
                item.title || item.name,
                item.content || item.description || item.bio
            ].join(' ').toLowerCase();
            return searchableText.includes(searchTerm);
        });
    }

    return results;
}

// Display search results
function displayResults(results, searchTerm) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = 'block';

    let hasResults = false;

    for (const [type, items] of Object.entries(results)) {
        if (items.length > 0) {
            hasResults = true;
            const typeSection = document.createElement('div');
            typeSection.className = 'search-type-section';
            
            const typeHeader = document.createElement('div');
            typeHeader.className = 'search-type-header';
            typeHeader.textContent = `Search "${searchTerm}" in ${type}`;
            typeSection.appendChild(typeHeader);

            const resultsList = document.createElement('ul');
            resultsList.className = 'search-results-list';

            items.slice(0, 3).forEach(item => {
                const li = document.createElement('li');
                li.className = 'search-result-item';
                const title = item.title || item.name;
                const description = item.content || item.description || item.bio;
                
                li.innerHTML = `
                    <div class="result-title">${highlightText(title, searchTerm)}</div>
                    <div class="result-description">${highlightText(description, searchTerm)}</div>
                `;

                li.addEventListener('click', () => handleResultClick(type, item));
                resultsList.appendChild(li);
            });

            typeSection.appendChild(resultsList);
            resultsContainer.appendChild(typeSection);
        }
    }

    if (!hasResults) {
        resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
    }
}

// Highlight search term in text
function highlightText(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Handle result click
function handleResultClick(type, item) {
    // Navigate to appropriate page based on type and item
    const baseUrl = window.location.origin;
    let url;

    switch(type) {
        case 'posts':
            url = `community.html?post=${item.id}`;
            break;
        case 'users':
            url = `user-profile.html?user=${item.id}`;
            break;
        case 'organizations':
            url = `organization.html?org=${item.id}`;
            break;
        case 'green projects':
            url = `green-projects.html?project=${item.id}`;
            break;
        case 'events':
            url = `/events.html?event=${item.id}`;
            break;
        default:
            url = baseUrl;
    }

    window.location.href = url;
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);
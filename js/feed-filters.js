document.addEventListener('DOMContentLoaded', () => {
    // Filter elements
    const locationTypeFilter = document.getElementById('locationTypeFilter');
    const locationInput = document.getElementById('locationInput');
    const selectedLocations = document.getElementById('selectedLocations');
    const goalCategoryFilter = document.getElementById('goalCategoryFilter');
    const feedSearch = document.getElementById('feedSearch');
    const postTypeChips = document.querySelectorAll('.filter-chip');
    const feedFilterToggle = document.getElementById('feedFilterToggle');
    feedFilterToggle.click();
    
    // Filter state
    let activeFilters = {
        locationType: 'all',
        locations: [],
        postType: 'all',
        goalCategory: '',
        searchQuery: ''
    };

    // Location suggestions data (example - replace with your actual data source)
    const locationSuggestions = {
        global: ['Worldwide'],
        country: ['United States', 'Canada', 'United Kingdom', 'Australia', 'India'],
        region: ['California', 'Ontario', 'London', 'New South Wales', 'Maharashtra'],
        city: ['New York', 'Toronto', 'London', 'Sydney', 'Mumbai'],
        neighborhood: ['Manhattan', 'Downtown Toronto', 'Soho London', 'Bondi Beach', 'Bandra']
    };

    // Setup location type filter
    locationTypeFilter.addEventListener('change', (e) => {
        activeFilters.locationType = e.target.value;
        !activeFilters.locationType || activeFilters.locationType === 'all'
                || activeFilters.locationType === 'Global' ?
            locationInput.style.display = 'none'
                    : locationInput.style.display = 'block';
        locationInput.placeholder = `Enter ${e.target.value} name...`;
        locationInput.value = '';
        showLocationSuggestions([]);
    });

    // Setup location input with auto-suggest
    let suggestionsContainer = document.getElementById('locationSuggestions');

    // Handle focus and blur events for location input
    locationInput.addEventListener('focus', () => {
        if (locationInput.value) {
            suggestionsContainer.classList.add('show');
        }
    });

    locationInput.addEventListener('blur', (e) => {
        // Delay hiding suggestions to allow for click events on suggestions
        setTimeout(() => {
            suggestionsContainer.classList.remove('show');
        }, 200);
    });

    locationInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase();
        const suggestions = locationSuggestions[activeFilters.locationType.toLowerCase()] || [];
        const filteredSuggestions = suggestions.filter(loc => 
            loc.toLowerCase().includes(query) && 
            !activeFilters.locations.includes(loc)
        );
        showLocationSuggestions(filteredSuggestions);
    }, 300));

    function showLocationSuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';
        if (suggestions.length > 0 && locationInput.value) {
            suggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.className = 'location-suggestion';
                div.textContent = suggestion;
                div.addEventListener('click', () => addLocation(suggestion));
                suggestionsContainer.appendChild(div);
            });
            suggestionsContainer.classList.add('show');
        } else {
            suggestionsContainer.classList.remove('show');
        }
    }

    function addLocation(location) {
        if (!activeFilters.locations.includes(location)) {
            activeFilters.locations.push(location);
            updateSelectedLocations();
            locationInput.value = '';
            showLocationSuggestions([]);
            applyFilters();
        }
    }

    window.removeLocation = function(location) {
        activeFilters.locations = activeFilters.locations.filter(loc => loc !== location);
        updateSelectedLocations();
        applyFilters();
    }

    function updateSelectedLocations() {
        selectedLocations.innerHTML = activeFilters.locations.map(location => `
            <div class="location-chip">
                ${location}
                <button class="remove-location" onclick="removeLocation('${location}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    // Event listeners for filters
    locationInput.addEventListener('change', (e) => {
        activeFilters.location = e.target.value;
        applyFilters();
    });

    goalCategoryFilter.addEventListener('change', (e) => {
        activeFilters.goalCategory = e.target.value;
        applyFilters();
    });

    feedSearch.addEventListener('input', debounce((e) => {
        activeFilters.searchQuery = e.target.value.toLowerCase();
        applyFilters();
    }, 300));

    // Post type chip filters
    postTypeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove active class from all chips
            postTypeChips.forEach(c => c.classList.remove('active'));
            // Add active class to clicked chip
            chip.classList.add('active');
            activeFilters.postType = chip.dataset.type;
            applyFilters();
        });
    });

    // Debounce function for search input
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

    // Apply filters to feed content
    function applyFilters() {
        const feedItems = document.querySelectorAll('.feed-item'); // Adjust selector based on your feed item structure

        feedItems.forEach(item => {
            let visible = true;

            // Location filter
            if (activeFilters.location && item.dataset.location !== activeFilters.location) {
                visible = false;
            }

            // Post type filter
            if (activeFilters.postType !== 'all' && item.dataset.postType !== activeFilters.postType) {
                visible = false;
            }

            // Goal type filter
            if (activeFilters.goalCategory && item.dataset.goalCategory !== activeFilters.goalCategory) {
                visible = false;
            }

            // Search filter
            if (activeFilters.searchQuery) {
                const searchableContent = item.textContent.toLowerCase();
                if (!searchableContent.includes(activeFilters.searchQuery)) {
                    visible = false;
                }
            }

            // Show/hide item based on filters
            item.style.display = visible ? 'block' : 'none';
        });
    }
});
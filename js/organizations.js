// Sample organization data (replace with actual data from backend)
let organizations = [
    {
        id: 1,
        name: 'AI Tech Solutions',
        category: 'Corporate',
        description: 'Leading the way in technology and AI solutions.',
        image: 'images/ai-tech.avif',
        initiatives: 15,
        followers: 2500,
        state: 'Karnataka',
        city: 'Bangalore',
        area: '560043'
    },
    {
        id: 2,
        name: 'Himalayan Wildlife Trust',
        category: 'Non-Profit',
        description: 'Protecting endangered Himalayan species and their habitats through community-based conservation.',
        image: 'images/wildlife-sanctuary.jpeg',
        initiatives: 12,
        followers: 1800,
        state: 'Uttarakhand',
        city: 'Dehradun',
        area: '248001'
    },
    {
        id: 3,
        name: 'Organic India Farms',
        category: 'Corporate',
        description: 'Promoting sustainable agriculture through organic farming practices and farmer empowerment.',
        image: 'images/green-earth.jpg',
        initiatives: 20,
        followers: 3200,
        state: 'Maharashtra',
        city: 'Pune',
        area: '411001'
    },
    {
        id: 4,
        name: 'Clean Energy Institute',
        category: 'Educational',
        description: 'Research and education center dedicated to advancing renewable energy technologies.',
        image: 'images/solar-farm.jpeg',
        initiatives: 8,
        followers: 1500,
        state: 'Tamil Nadu',
        city: 'Chennai',
        area: '600001'
    },
    {
        id: 5,
        name: 'Bay of Bengal Conservation',
        category: 'Non-Profit',
        description: 'Marine ecosystem protection and sustainable fishing practices advocacy.',
        image: 'images/ocean-conservation.avif',
        initiatives: 18,
        followers: 2800,
        state: 'West Bengal',
        city: 'Kolkata',
        area: '700001'
    },
    {
        id: 6,
        name: 'Smart Waste Solutions',
        category: 'Corporate',
        description: 'Innovative waste management and recycling technologies for urban India.',
        image: 'images/waste-management.jpeg',
        initiatives: 25,
        followers: 4200,
        state: 'Gujarat',
        city: 'Ahmedabad',
        area: '380001'
    },
    {
        id: 7,
        name: 'Desert Greening Initiative',
        category: 'Government',
        description: 'Combating desertification through sustainable land management and water conservation.',
        image: 'images/water-conservation.jpeg',
        initiatives: 15,
        followers: 2100,
        state: 'Rajasthan',
        city: 'Jodhpur',
        area: '342001'
    },
    {
        id: 8,
        name: 'EcoMobility India',
        category: 'Corporate',
        description: 'Accelerating the adoption of electric vehicles and sustainable transportation.',
        image: 'images/electric-mobility.jpeg',
        initiatives: 22,
        followers: 3800,
        state: 'Delhi',
        city: 'New Delhi',
        area: '110001'
    },
    {
        id: 9,
        name: 'Kerala Biodiversity Board',
        category: 'Government',
        description: 'Preserving and documenting the rich biodiversity of Keralas ecosystems.',
        image: 'images/green-project-placeholder.jpg',
        initiatives: 30,
        followers: 4500,
        state: 'Kerala',
        city: 'Thiruvananthapuram',
        area: '695001'
    },
    {
        id: 10,
        name: 'Northeast Forest Alliance',
        category: 'Non-Profit',
        description: 'Protecting the biodiversity-rich forests of Northeast India through community participation.',
        image: 'images/reforestation.jpg',
        initiatives: 16,
        followers: 2300,
        state: 'Assam',
        city: 'Guwahati',
        area: '781001'
    },
    {
        id: 11,
        name: 'Water Wise Foundation',
        category: 'Educational',
        description: 'Education and research center focused on water conservation and management.',
        image: 'images/water-wise.jpg',
        initiatives: 12,
        followers: 1900,
        state: 'Madhya Pradesh',
        city: 'Bhopal',
        area: '462001'
    },
    {
        id: 12,
        name: 'Save Water Foundation',
        category: 'Non-profit',
        description: 'Education and research center focused on water conservation and management.',
        image: 'images/save-water-foundation.avif',
        initiatives: 12,
        followers: 1900,
        state: 'West Bengal',
        city: 'Kolkata',
        area: '700001'
    },
    {
        id: 13,
        name: 'Bangalore Soap Company',
        category: 'Corporate',
        description: 'FMCG Company.',
        image: 'images/soap.jpeg',
        initiatives: 12,
        followers: 1900,
        state: 'Karnataka',
        city: 'Bangalore',
        area: '560001'
    }
];

// State data for filter
const states = [
    'Assam',
    'Gujarat',
    'Karnataka',
    'Kerala',
    'Maharastra',
    'Madhya Pradesh',
    'Tamil Nadu',
    'Uttarankhand',
    'West Bengal'
    // Add more states
];

// State data for filter
const cities = [
    'Ahmedabad',
    'Bangalore',
    'Bhopal',
    'Chennai',
    'Dehradun',
    'Guwahati',
    'Kolkata',
    'Mumbai',
    'Pune',
    'Thiruvananthapuram'
    // Add more cities
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    displayOrganizations(organizations);
    setupEventListeners();
});

// Initialize filters
function initializeFilters() {
    // Populate state filter
    const stateFilter = document.getElementById('state-filter');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateFilter.appendChild(option);
    });
    const cityFilter = document.getElementById('city-filter');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('org-search');
    searchInput.addEventListener('input', debounce(handleSearchOrg, 300));

    // Filters
    document.getElementById('org-type-filter').addEventListener('change', applyOrgFilters);
    document.getElementById('state-filter').addEventListener('change', handleStateChange);
    document.getElementById('city-filter').addEventListener('change', applyOrgFilters);
    document.getElementById('area-filter').addEventListener('input', debounce(applyOrgFilters, 300));

    // Load more button
    document.getElementById('load-more-btn').addEventListener('click', loadMore);
}

// Handle state change
function handleStateChange(e) {
    const selectedState = e.target.value;
    const cityFilter = document.getElementById('city-filter');
    
    // Clear existing cities
    cityFilter.innerHTML = '<option value="">All Cities</option>';
    
    if (selectedState) {
        // Get cities for selected state (replace with actual data)
        const citiesForState = getCitiesForState(selectedState);
        citiesForState.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityFilter.appendChild(option);
        });
    } else {
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityFilter.appendChild(option);
        });
    }
    
    applyOrgFilters();
}

// Get cities for state (replace with actual data)
function getCitiesForState(state) {
    // Sample data - replace with actual city data
    const citiesByState = {
        'Assam': ['Guwahati', 'Silchar', 'Nagaon'],
        'Gujarat': ['Ahmedabad', 'Surat', 'Gandhinagar'],
        'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
        'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kollam'],
        'Maharastra': ['Mumbai', 'Pune', 'Nagpur'],
        'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
        'Uttarankhand': ['Dehradun', 'Haridwar', 'Rohtak'],
        'West Bengal': ['Kolkata', 'Howrah', 'Siliguri', 'Haldia']};
    return citiesByState[state] || cities;
}

// Handle search
function handleSearchOrg(event) {
    applyOrgFilters();
}

// Apply all filters
function applyOrgFilters() {
    const searchTerm = document.getElementById('org-search').value.toLowerCase();
    const typeFilter = document.getElementById('org-type-filter').value;
    const stateFilter = document.getElementById('state-filter').value;
    const cityFilter = document.getElementById('city-filter').value;
    const areaFilter = document.getElementById('area-filter').value;

    const filteredOrgs = organizations.filter(org => {
        const matchesSearch = org.name.toLowerCase().includes(searchTerm) ||
                            org.description.toLowerCase().includes(searchTerm);
        const matchesType = !typeFilter || org.category === typeFilter;
        const matchesState = !stateFilter || org.state === stateFilter;
        const matchesCity = !cityFilter || org.city === cityFilter;
        const matchesArea = !areaFilter || org.area.includes(areaFilter);

        return matchesSearch && matchesType && matchesState && matchesCity && matchesArea;
    });

    displayOrganizations(filteredOrgs);
}

// Display organizations
function displayOrganizations(orgs) {
    const orgGrid = document.querySelector('.organizations-grid');
    orgGrid.innerHTML = '';

    if (orgs.length === 0) {
        orgGrid.innerHTML = '<p class="no-results">No organizations found matching your criteria.</p>';
        return;
    }

    orgs.forEach(org => {
        const orgCard = `
            <article class="org-card">
                <a href="organization.html?id=${org.id}">
                    <img src="${org.image}" alt="${org.name}" class="org-image">
                </a>
                <div class="org-content">
                    <span class="org-category">${org.category}</span>
                    <a href="organization.html?id=${org.id}">
                        <h3 class="org-title">${org.name}</h3>
                    </a>
                    <p class="org-description">${org.description}</p>
                    <div class="org-stats">
                        <span class="org-stat"><i class="fas fa-leaf"></i> ${org.initiatives} Initiatives</span>
                        <span class="org-stat"><i class="fas fa-users"></i> ${(org.followers/1000).toFixed(1)}K Followers</span>
                    </div>
                </div>
            </article>
        `;
        orgGrid.insertAdjacentHTML('beforeend', orgCard);
    });
}

// Load more organizations
function loadMore() {
    // Implement pagination or infinite scroll logic here
    // For now, just console log
    console.log('Load more organizations...');
}

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
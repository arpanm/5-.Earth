document.addEventListener('DOMContentLoaded', () => {
    initOrgFilters();
    loadOrganizations();
});

// Mock data for organizations
const organizations = [
    {
        id: 1,
        name: 'Green Tech Solutions',
        category: 'Corporate',
        description: 'Leading the way in sustainable technology and renewable energy solutions.',
        image: 'images/green-tech.jpeg',
        initiatives: 15,
        followers: 2500,
        companyId: '111'
    },
    {
        id: 2,
        name: 'Ocean Conservation Alliance',
        category: 'Non-Profit',
        description: 'Dedicated to protecting marine ecosystems and promoting sustainable practices.',
        image: 'images/ocean-conservation.avif',
        initiatives: 12,
        followers: 1800,
        companyId: '112'
    },
    {
        id: 3,
        name: 'EcoEd Institute',
        category: 'Educational',
        description: 'Empowering the next generation through environmental education and research.',
        image: 'images/green-earth.jpg',
        initiatives: 8,
        followers: 1200,
        companyId: '113'
    },
    {
        id: 4,
        name: 'Wildlife Trust',
        category: 'Non-Profit',
        description: 'Protecting endangered species and their habitats through conservation efforts.',
        image: 'images/wildlife-trust.jpeg',
        initiatives: 20,
        followers: 3000,
        companyId: '114'
    },
    {
        id: 5,
        name: 'Solar Solutions Inc',
        category: 'Corporate',
        description: 'Making solar energy accessible and affordable for everyone.',
        image: 'images/solar-solutions.jpg',
        initiatives: 10,
        followers: 1500,
        companyId: '115'
    },
    {
        id: 6,
        name: 'Environmental Protection Agency',
        category: 'Government',
        description: 'Setting and enforcing environmental standards for a sustainable future.',
        image: 'images/water-conservation.jpeg',
        initiatives: 25,
        followers: 5000,
        companyId: '116'
    }
];

// Initialize organization filters
function initOrgFilters() {
    const filterButtons = document.querySelectorAll('.org-filters .filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter organizations
            const category = button.textContent;
            filterOrganizations(category);
        });
    });
}

// Filter organizations based on category
function filterOrganizations(category) {
    const filteredOrgs = category === 'All' 
        ? organizations 
        : organizations.filter(org => org.category === category);
    
    displayOrganizations(filteredOrgs);
}

// Display organizations in the grid
function displayOrganizations(orgs) {
    const orgGrid = document.querySelector('.org-grid');
    orgGrid.innerHTML = '';
    
    orgs.forEach(org => {
        const orgCard = `
            <article class="org-card">
                <a href="organization.html">
                    <img src="${org.image}" alt="${org.name}" class="org-image">
                </a>
                <div class="org-content">
                    <span class="org-category">${org.category}</span>
                    <a href="organization.html">
                        <h3 class="org-title">${org.name}</h3>
                    </a>
                    <p class="org-description">${org.description}</p>
                    <div class="org-stats">
                        <span class="org-stat"><i class="fas fa-leaf"></i> ${org.initiatives} Initiatives</span>
                        <span class="org-stat"><i class="fas fa-users"></i> ${(org.followers/1000).toFixed(1)}K Followers</span>
                    </div>
                    <button class="follow-btn" data="company:${org.companyId}"><i class="fas fa-building"></i> Follow</button>
                </div>
            </article>
        `;
        orgGrid.insertAdjacentHTML('beforeend', orgCard);
    });
}

// Load initial organizations
function loadOrganizations() {
    displayOrganizations(organizations);
}
document.addEventListener('DOMContentLoaded', function() {
    // Filter elements
    const locationTypeSelect = document.getElementById('location-type');
    const locationInput = document.getElementById('location');
    const goalCategorySelect = document.getElementById('goal-category');

    // Community grid container
    const communityGrid = document.querySelector('.community-grid');

    // Sample community data (replace with actual API call)
    const communities = [
        {
            id: 1,
            name: 'Green Earth Warriors',
            description: 'A community dedicated to promoting sustainable living and environmental conservation in urban areas.',
            coverImage: 'images/green-earth.jpg',
            members: 1200,
            location: 'New York City',
            locationType: 'city',
            categories: ['Climate Action', 'Urban Green'],
            goalCategory: 'climate'
        },
        {
            id: 2,
            name: 'Ocean Conservation Group',
            description: 'Working together to protect marine life and reduce ocean pollution through community action.',
            coverImage: 'images/ocean-conservation.avif',
            members: 850,
            location: 'Miami',
            locationType: 'city',
            categories: ['Water Conservation', 'Marine Life'],
            goalCategory: 'water'
        },
        {
            id: 3,
            name: 'Waste Warriors',
            description: 'Community focused on zero-waste lifestyle and proper waste management practices.',
            coverImage: 'images/waste-management.webp',
            members: 650,
            location: 'California',
            locationType: 'region',
            categories: ['Waste Management', 'Zero Waste'],
            goalCategory: 'waste'
        }
    ];

    // Function to format member count
    function formatMemberCount(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count;
    }

    // Function to create community card
    function createCommunityCard(community) {
        return `
            <div class="community-card">
                <div class="community-cover" style="background-image: url('${community.coverImage}');"></div>
                <div class="community-info">
                    <h3 class="community-name">${community.name}</h3>
                    <p class="community-description">${community.description}</p>
                    <div class="community-stats">
                        <div class="stat-item">
                            <i class="fas fa-users"></i>
                            <span>${formatMemberCount(community.members)} members</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${community.location}</span>
                        </div>
                    </div>
                    <div class="community-tags">
                        ${community.categories.map(category => 
                            `<span class="community-tag">${category}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Function to filter communities
    function filterCommunities() {
        const locationType = locationTypeSelect.value.toLowerCase();
        const location = locationInput.value.toLowerCase();
        const goalCategory = goalCategorySelect.value.toLowerCase();

        const filteredCommunities = communities.filter(community => {
            const matchLocationType = !locationType || community.locationType === locationType;
            const matchLocation = !location || community.location.toLowerCase().includes(location);
            const matchGoalCategory = !goalCategory || community.goalCategory === goalCategory;

            return matchLocationType && matchLocation && matchGoalCategory;
        });

        // Update community grid
        communityGrid.innerHTML = filteredCommunities.map(createCommunityCard).join('');

        // Add click event listeners to community cards
        document.querySelectorAll('.community-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                window.location.href = `community-details.html?id=${filteredCommunities[index].id}`;
            });
        });
    }

    // Add event listeners to filters
    locationTypeSelect.addEventListener('change', filterCommunities);
    locationInput.addEventListener('input', filterCommunities);
    goalCategorySelect.addEventListener('change', filterCommunities);

    // Initial render
    filterCommunities();
});
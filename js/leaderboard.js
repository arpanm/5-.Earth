// Sample leaderboard data for different time periods
const leaderboardData = {
    weekly: [
        {
            rank: 1,
            name: "Nisha G",
            avatar: "images/profile-woman-2.avif",
            impactPoints: 2450,
            recentContribution: "Wildlife conservation project",
            badges: [
                { icon: "fas fa-paw", text: "Wildlife Protector" },
                { icon: "fas fa-tree", text: "Forest Guardian" }
            ]
        },
        {
            rank: 2,
            name: "Sarah Jain",
            avatar: "images/profile-woman.png",
            impactPoints: 2100,
            recentContribution: "Neighborhood composting initiative",
            badges: [
                { icon: "fas fa-sun", text: "Energy Pioneer" },
                { icon: "fas fa-star", text: "Impact Maker" }
            ]
        },
        {
            rank: 3,
            name: "Robin Kaul",
            avatar: "images/profile-man-2.jpg",
            impactPoints: 25600,
            recentContribution: "Cleaning up the Lakes",
            badges: [
                { icon: "fas fa-seedling", text: "Green Pioneer" },
                { icon: "fas fa-heart", text: "Nature Lover" }
            ]
        }
    ],
    monthly: [
        {
            rank: 1,
            name: "Sarah Jain",
            avatar: "images/profile-woman.png",
            impactPoints: 2100,
            recentContribution: "Neighborhood composting initiative",
            badges: [
                { icon: "fas fa-sun", text: "Energy Pioneer" },
                { icon: "fas fa-star", text: "Impact Maker" }
            ]
        },
        {
            rank: 2,
            name: "Abhinash P",
            avatar: "images/profile-man.avif",
            impactPoints: 7800,
            recentContribution: "Community garden initiative",
            badges: [
                { icon: "fas fa-award", text: "Top Contributor" },
                { icon: "fas fa-tree", text: "Forest Guardian" }
            ]
        },
        {
            rank: 3,
            name: "Nisha G",
            avatar: "images/profile-woman-2.avif",
            impactPoints: 2450,
            recentContribution: "Wildlife conservation project",
            badges: [
                { icon: "fas fa-paw", text: "Wildlife Protector" },
                { icon: "fas fa-tree", text: "Forest Guardian" }
            ]
        }
    ],
    alltime: [
        {
            rank: 1,
            name: "Robin Kaul",
            avatar: "images/profile-man-2.jpg",
            impactPoints: 25600,
            recentContribution: "Cleaning up the Lakes",
            badges: [
                { icon: "fas fa-seedling", text: "Green Pioneer" },
                { icon: "fas fa-heart", text: "Nature Lover" }
            ]
        },
        {
            rank: 2,
            name: "Nisha G",
            avatar: "images/profile-woman-2.avif",
            impactPoints: 2450,
            recentContribution: "Wildlife conservation project",
            badges: [
                { icon: "fas fa-paw", text: "Wildlife Protector" },
                { icon: "fas fa-tree", text: "Forest Guardian" }
            ]
        },
       {
            rank: 3,
            name: "Abhinash P",
            avatar: "images/profile-man.avif",
            impactPoints: 7800,
            recentContribution: "Community garden initiative",
            badges: [
                { icon: "fas fa-award", text: "Top Contributor" },
                { icon: "fas fa-tree", text: "Forest Guardian" }
            ]
        }
    ]
};

// Function to generate HTML for a single leaderboard entry
function generateLeaderboardEntryHTML(entry) {
    const badgesHTML = entry.badges
        .map(badge => `<span class="leader-badge"><i class="${badge.icon}"></i> ${badge.text}</span>`)
        .join('');

    return `
        <div class="leaderboard-entry">
            <div class="rank">#${entry.rank}</div>
            <a href="user-profile.html">
                <img src="${entry.avatar}" alt="User Avatar" class="user-avatar">
            </a>
            <div class="user-info">
                <a href="user-profile.html">
                    <h3>${entry.name}</h3>
                </a>
                <div class="impact-score">
                    <i class="fas fa-leaf"></i>
                    <span>${entry.impactPoints} Impact Points</span>
                </div>
                <div class="recent-contribution">Recent: ${entry.recentContribution}</div>
            </div>
            <div class="achievements">
                ${badgesHTML}
            </div>
        </div>
    `;
}

// Function to update leaderboard display
function updateLeaderboard(timeframe) {
    const leaderboardList = document.querySelector('.leaderboard-list');
    const data = leaderboardData[timeframe];
    
    if (leaderboardList && data) {
        leaderboardList.innerHTML = data.map(entry => generateLeaderboardEntryHTML(entry)).join('');
    }
}

// Function to handle tab clicks
function handleTabClick(event) {
    if (!event.target.classList.contains('tab-btn')) return;

    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Get the timeframe from the tab text
    const timeframe = event.target.textContent.toLowerCase().replace(' ', '');
    
    // Update the leaderboard
    updateLeaderboard(timeframe);
}

// Initialize leaderboard functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.leaderboard-tabs');
    if (tabsContainer) {
        tabsContainer.addEventListener('click', handleTabClick);
        
        // Show weekly leaderboard by default
        updateLeaderboard('weekly');
    }
});
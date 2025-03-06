document.addEventListener('DOMContentLoaded', () => {
    initTabSwitching();
    initMap();
    loadDynamicContent();
});

// Tab Switching Logic
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.add('hidden'));

            button.classList.add('active');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
}

// Map Initialization
function initMap() {
    const map = L.map('map').setView([12.976746, 77.575278], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add marker for organization location
    L.marker([37.7749, -122.4194])
        .addTo(map)
        .bindPopup('Green Tech Solutions<br>123 Eco Street, Green Valley, CA 94123');
}

// Dynamic Content Loading
function loadDynamicContent() {
    const postsContainer = document.querySelector('.posts-container');
    const mentionsContainer = document.querySelector('.mentions-container');

    // Sample posts data
    const samplePosts = [
        {
            id: 1,
            author: {
                name: 'Company Admin',
                avatar: 'images/company-admin.jpeg',
                timeAgo: '2 days ago'
            },
            type: 'quick-post',
            content: 'Launching New Solar Initiative',
            image: '',
            stats: {
                likes: 245,
                comments: [
                    {
                        id: 101,
                        text: 'Waiting for it. Great to see this.',
                        author: 'John Smith',
                        timestamp: '2023-12-10 14:30:00'
                    }
                ]
            }
        },{
            id: 1,
            author: {
                name: 'Company Admin',
                avatar: 'images/company-admin.jpeg',
                timeAgo: '12 days ago'
            },
            type: 'quick-post',
            content: 'Community Clean-up Drive Success',
            image: '',
            stats: {
                likes: 189,
                comments: [
                    {
                        id: 101,
                        text: 'Awasome event.',
                        author: 'John Smith',
                        timestamp: '2025-02-10 14:30:00'
                    },
                    {
                        id: 102,
                        text: 'Great.',
                        author: 'Amit Sharma',
                        timestamp: '2023-12-10 14:30:00'
                    },
                    {
                        id: 103,
                        text: 'Need more often.',
                        author: 'Kush Nagar',
                        timestamp: '2025-02-10 14:30:00'
                    }
                ]
            }
        }
    ];

    // Display posts
    samplePosts.forEach(post => {
        postsContainer.appendChild(createPostCard(post));
    });

    // Sample mentions data
    const sampleMentions = [
        {
            id: 1,
            author: {
                name: 'EcoNews Daily',
                avatar: 'images/EcoNews.jpeg',
                timeAgo: '12 days ago'
            },
            type: 'blog-post',
            content: '@GreenTechSolutions leads the way in sustainable technology innovation with their latest renewable energy solutions.',
            image: '',
            link: 'econewsdaily.com/solar-energy-solutions',
            stats: {
                likes: 189,
                comments: [
                    {
                        id: 101,
                        text: 'Awasome event.',
                        author: 'John Smith',
                        timestamp: '2025-02-10 14:30:00'
                    },
                    {
                        id: 102,
                        text: 'Great.',
                        author: 'Amit Sharma',
                        timestamp: '2023-12-10 14:30:00'
                    },
                    {
                        id: 103,
                        text: 'Need more often.',
                        author: 'Kush Nagar',
                        timestamp: '2025-02-10 14:30:00'
                    }
                ]
            }
        },
        {
            id: 2,
            author: {
                name: 'Sustainability Weekly',
                avatar: 'images/SustainabilityWeekly.png',
                timeAgo: '22 days ago'
            },
            type: 'quick-post',
            content: 'Featured: How @GreenTechSolutions is transforming corporate sustainability practices.',
            image: '',
            link: 'sustainabilityweekly.com/corporate-sustainability',
            stats: {
                likes: 289,
                comments: [
                    {
                        id: 101,
                        text: 'Awasome initiative.',
                        author: 'John Smith',
                        timestamp: '2025-02-10 14:30:00'
                    }
                ]
            }
        }
    ];

    // Display mentions
    sampleMentions.forEach(mention => {
        mentionsContainer.appendChild(createPostCard(mention));
    });
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
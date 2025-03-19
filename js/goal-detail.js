// Get goal ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const goalId = urlParams.get('id');

// Mock data for development - Replace with actual API calls
const mockGoal = {
    id: 1,
    title: 'Reduce Water Consumption',
    category: 'Water Conservation',
    type: 'Individual',
    validation: 'Self',
    description: 'Reduce daily water consumption by 20% through mindful usage and fixing leaks.'
};

const mockParticipants = [
    {
        id: 1,
        name: 'John Doe',
        avatar: 'images/profile-man.avif',
        location: 'New York',
        connection: '1st',
        progress: 75
    },
    {
        id: 2,
        name: 'Sarah Chen',
        avatar: 'images/profile-woman.png',
        location: 'San Francisco',
        connection: '1st',
        progress: 100
    },
    {
        id: 3,
        name: 'Michael Brown',
        avatar: 'images/profile-man-2.jpg',
        location: 'London',
        connection: '2nd',
        progress: 30
    },
    {
        id: 4,
        name: 'Emma Wilson',
        avatar: 'images/profile-woman-2.avif',
        location: 'Sydney',
        connection: '2nd',
        progress: 0
    },
    {
        id: 5,
        name: 'David Kim',
        avatar: 'images/profile-man.avif',
        location: 'Tokyo',
        connection: '1st',
        progress: 60
    },
    {
        id: 6,
        name: 'Lisa Garcia',
        avatar: 'images/profile-woman.png',
        location: 'New York',
        connection: '2nd',
        progress: 45
    }
];

const mockActions = [
    {
        id: 1,
        userId: 1,
        userName: 'John Doe',
        userAvatar: 'images/profile-man.avif',
        timestamp: '2024-01-15T10:30:00',
        type: 'quick_post',
        description: 'Installed water-efficient fixtures in all bathrooms',
        media: 'images/water-conservation.jpeg',
        likes: 12,
        validated: false,
        validationType: 'SELF',
        impactLevel: 'MEDIUM',
        comments: []
    },
    {
        id: 2,
        userId: 2,
        userName: 'Sarah Chen',
        userAvatar: 'images/profile-woman.png',
        timestamp: '2024-01-16T14:20:00',
        type: 'blog',
        title: 'Water Audit Results and Recommendations',
        description: 'Conducted a water usage audit and identified 3 major areas for improvement. Read my detailed analysis and recommendations for implementing water-saving measures in your home.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        media: 'images/water-wise.jpg',
        likes: 8,
        validated: true,
        comments: []
    },
    {
        id: 3,
        userId: 3,
        userName: 'Michael Brown',
        userAvatar: 'images/profile-man-2.jpg',
        timestamp: '2024-01-17T09:15:00',
        type: 'poll',
        title: 'Which water-saving method works best for you?',
        description: 'Share your experience with different water conservation techniques',
        options: [
            { id: 1, text: 'Low-flow fixtures', votes: 45 },
            { id: 2, text: 'Rainwater harvesting', votes: 32 },
            { id: 3, text: 'Greywater recycling', votes: 28 },
            { id: 4, text: 'Smart irrigation', votes: 39 }
        ],
        totalVotes: 144,
        endDate: '2024-02-17T09:15:00',
        likes: 15,
        validated: true,
        comments: []
    },
    {
        id: 4,
        userId: 5,
        userName: 'David Kim',
        userAvatar: 'images/profile-man.avif',
        timestamp: '2024-01-18T16:45:00',
        type: 'event',
        title: 'Community Water Conservation Workshop',
        description: 'Join us for an interactive workshop on water-saving practices. Learn from experts and share your experiences.',
        eventDate: '2024-02-01T14:00:00',
        location: 'Community Center',
        capacity: 50,
        registered: 35,
        media: 'images/water-conservation.jpeg',
        likes: 20,
        validated: false,
        comments: []
    },
    {
        id: 5,
        userId: 2,
        userName: 'Sarah Chen',
        userAvatar: 'images/profile-woman.png',
        timestamp: '2024-01-19T11:30:00',
        type: 'milestone',
        title: 'Monthly Water Savings Achievement',
        description: 'Monthly water consumption reduced by 25% through implemented changes',
        progress: 25,
        target: 20,
        media: 'images/water-wise.jpg',
        likes: 30,
        validated: true,
        comments: []
    },
    {
        id: 6,
        userId: 6,
        userName: 'Lisa Garcia',
        userAvatar: 'images/profile-woman.png',
        timestamp: '2024-01-20T13:10:00',
        type: 'project_update',
        title: 'Smart Water Monitoring System',
        description: 'Started monitoring daily water usage with smart meter. This project aims to provide real-time water consumption data to help identify waste and optimize usage.',
        projectStatus: 'In Progress',
        completion: 45,
        media: 'images/water-conservation.jpeg',
        likes: 5,
        validated: false,
        comments: []
    },
    {
        id: 7,
        userId: 1,
        userName: 'John Doe',
        userAvatar: 'images/profile-man.avif',
        timestamp: '2024-01-21T15:20:00',
        type: 'educational_content',
        title: 'Understanding Your Water Footprint',
        description: 'Learn how to calculate and reduce your daily water footprint with this comprehensive guide.',
        contentType: 'guide',
        readTime: '5 mins',
        media: 'images/water-wise.jpg',
        likes: 18,
        validated: true,
        comments: []
    },
    {
        id: 8,
        userId: 5,
        userName: 'David Kim',
        userAvatar: 'images/profile-man.avif',
        timestamp: '2024-01-22T10:45:00',
        type: 'innovation',
        title: 'Rainwater Harvesting System',
        description: 'Implemented rainwater harvesting system for garden irrigation',
        innovationType: 'Infrastructure',
        impact: 'High',
        media: 'images/water-conservation.jpeg',
        likes: 25,
        validated: true,
        comments: []
    }
];

// Load goal details
function loadGoalDetails() {
    document.getElementById('goalTitle').textContent = mockGoal.title;
    document.getElementById('goalCategory').innerHTML = `<i class="fas fa-tag"></i> ${mockGoal.category}`;
    document.getElementById('goalType').innerHTML = `<i class="fas fa-bullseye"></i> ${mockGoal.type}`;
    document.getElementById('goalValidation').innerHTML = `<i class="fas fa-check-circle"></i> ${mockGoal.validation}`;
    document.getElementById('goalDescription').textContent = mockGoal.description;
    loadValidationSystem();
}

// Initialize validation system
function loadValidationSystem() {
    mockActions.forEach(action => {
        if (!action.validated && action.validationType) {
            validationSystem.submitForValidation(action, action.validationType);
        }
    });
}

// Update validation UI after validation
function updateValidationUI(requestId) {
    const request = validationSystem.validationQueue.get(requestId);
    if (request && request.status === 'validated') {
        const validationContainer = document.querySelector(`[data-request-id="${requestId}"]`);
        if (validationContainer) {
            validationContainer.innerHTML = `
                <div class="validation-success">
                    <i class="fas fa-check-circle"></i> Validated
                    <span class="points-earned">+${request.points} points</span>
                </div>
            `;
        }
    }
}

let selectedUserId = null;

// Render participant card
function createParticipantCard(participant) {
    return `
        <div class="participant-card" data-user-id="${participant.id}" onclick="filterActionsByUser(${participant.id})">
            <div class="participant-header">
                <img src="${participant.avatar}" alt="${participant.name}" class="participant-avatar">
                <div class="participant-info">
                    <h3>${participant.name}</h3>
                    <span>${participant.location} • ${participant.connection} connection</span>
                </div>
            </div>
            <div class="participant-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${participant.progress}%"></div>
                </div>
                <span>${participant.progress}% Complete</span>
            </div>
        </div>
    `;
}

// Filter actions by user
function filterActionsByUser(userId) {
    const previousCard = document.querySelector('.participant-card.selected');
    if (previousCard) {
        previousCard.classList.remove('selected');
    }

    if (selectedUserId === userId) {
        selectedUserId = null;
    } else {
        selectedUserId = userId;
        const currentCard = document.querySelector(`.participant-card[data-user-id="${userId}"]`);
        if (currentCard) {
            currentCard.classList.add('selected');
        }
    }

    loadActions();
}

// Load actions feed
function loadActions() {
    const actionsList = document.getElementById('actionsList');
    const filteredActions = selectedUserId
        ? mockActions.filter(action => action.userId === selectedUserId)
        : mockActions;
    actionsList.innerHTML = filteredActions.map(createActionItem).join('');
}

// Load and filter participants
function loadParticipants() {
    const locationFilter = document.getElementById('locationFilter').value;
    const connectionFilter = document.getElementById('connectionFilter').value;
    const progressFilter = document.getElementById('progressFilter').value;

    const filteredParticipants = mockParticipants.filter(participant => {
        if (locationFilter && participant.location !== locationFilter) return false;
        if (connectionFilter !== 'all' && participant.connection !== connectionFilter) return false;
        
        switch(progressFilter) {
            case 'completed':
                return participant.progress === 100;
            case 'in-progress':
                return participant.progress > 0 && participant.progress < 100;
            case 'not-started':
                return participant.progress === 0;
            default:
                return true;
        }
    });

    const participantsGrid = document.getElementById('participantsGrid');
    participantsGrid.innerHTML = filteredParticipants.map(createParticipantCard).join('');
}

// Render action item
function createActionItem(action) {
    let actionContent = '';
    
    // Add activity type tag
    actionContent += `<div class="action-type-tag">${action.type.replace('_', ' ')}</div>`;
    
    // Add title for activity types that have it
    if (action.title) {
        actionContent += `<h4 class="action-title">${action.title}</h4>`;
    }

    // Add description for all types
    actionContent += `<p class="action-description">${action.description}</p>`;

    // Add type-specific content
    switch(action.type) {
        case 'blog':
            actionContent += `
                <div class="blog-content">
                    <p>${action.content}</p>
                </div>
            `;
            break;
        case 'poll':
            const totalVotes = action.totalVotes;
            actionContent += `
                <div class="poll-container">
                    ${action.options.map(option => {
                        const percentage = Math.round((option.votes / totalVotes) * 100);
                        return `
                            <div class="poll-option">
                                <div class="poll-option-text">${option.text}</div>
                                <div class="poll-progress-bar">
                                    <div class="poll-progress-fill" style="width: ${percentage}%"></div>
                                </div>
                                <div class="poll-stats">${option.votes} votes (${percentage}%)</div>
                            </div>
                        `;
                    }).join('')}
                    <div class="poll-total">Total votes: ${totalVotes}</div>
                    <div class="poll-deadline">Poll ends: ${new Date(action.endDate).toLocaleDateString()}</div>
                </div>
            `;
            break;
        case 'event':
            actionContent += `
                <div class="event-details">
                    <div class="event-info">
                        <i class="far fa-calendar"></i> ${new Date(action.eventDate).toLocaleDateString()}
                        <i class="far fa-map-marker-alt"></i> ${action.location}
                    </div>
                    <div class="event-capacity">
                        <div class="capacity-bar">
                            <div class="capacity-fill" style="width: ${(action.registered/action.capacity)*100}%"></div>
                        </div>
                        <span>${action.registered}/${action.capacity} registered</span>
                    </div>
                </div>
            `;
            break;
        case 'milestone':
            actionContent += `
                <div class="milestone-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(action.progress/action.target)*100}%"></div>
                    </div>
                    <span>${action.progress}% achieved (Target: ${action.target}%)</span>
                </div>
            `;
            break;
        case 'project_update':
            actionContent += `
                <div class="project-status">
                    <span class="status-badge">${action.projectStatus}</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${action.completion}%"></div>
                    </div>
                    <span>${action.completion}% complete</span>
                </div>
            `;
            break;
        case 'educational_content':
            actionContent += `
                <div class="educational-meta">
                    <span class="content-type">${action.contentType}</span>
                    <span class="read-time"><i class="far fa-clock"></i> ${action.readTime}</span>
                </div>
            `;
            break;
        case 'innovation':
            actionContent += `
                <div class="innovation-meta">
                    <span class="innovation-type">${action.innovationType}</span>
                    <span class="impact-level">Impact: ${action.impact}</span>
                </div>
            `;
            break;
    }

    // Add media if present
    if (action.media) {
        actionContent += `<div class="action-media"><img src="${action.media}" alt="Action media"></div>`;
    }

    return `
        <div class="action-item ${action.type}" data-action-id="${action.id}">
            <div class="action-header">
                <img src="${action.userAvatar}" alt="${action.userName}" class="user-avatar">
                <div class="action-meta">
                    <h3>${action.userName}</h3>
                    <span>${new Date(action.timestamp).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="action-body">
                ${actionContent}
            </div>
            <div class="action-stats">
                <button class="like-btn ${action.liked ? 'active' : ''}" onclick="toggleLike(${action.id})">
                    <i class="${action.liked ? 'fas' : 'far'} fa-heart"></i>
                    <span>${action.likes}</span>
                </button>
                <button type="button" onclick="validateAction()" class="share-btn"><i class="fas fa-share-alt"></i></button>
                <button class="validate-btn ${action.validated ? 'active' : ''}" onclick="validateAction(${action.id})">
                    <i class="${action.validated ? 'fas' : 'far'} fa-check-circle"></i> Validate
                </button>
            </div>
        </div>
    `;
}

// Load actions feed
function loadActions() {
    const actionsList = document.getElementById('actionsList');
    actionsList.innerHTML = mockActions.map(createActionItem).join('');
}

// Toggle like on action
function toggleLike(actionId) {
    const action = mockActions.find(a => a.id === actionId);
    if (action) {
        action.liked = !action.liked;
        action.likes += action.liked ? 1 : -1;
        loadActions();
    }
}

// Validate action
function validateAction(actionId, validationType) {
    const action = mockActions.find(a => a.id === actionId);
    if (action) {
        const validationModal = document.getElementById('validationModal');
        if (validationModal) {
            validationModal.style.display = 'block';
            window.currentActionId = actionId; // Store current action ID for validation handling
            // Set validation type if provided
            const finalValidationType = validationType || action.validationType || 'SELF';
            window.currentValidationType = finalValidationType; // Store validation type for form customization
            // You can use the validation type here to customize the form
        }
    }
}

// Submit comment
function submitComment() {
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value.trim();
    
    if (comment) {
        // Add comment to the selected action
        // This is a mock implementation
        commentInput.value = '';
        alert('Comment posted successfully!');
    }
}

// Event listeners
document.getElementById('locationFilter').addEventListener('change', loadParticipants);
document.getElementById('connectionFilter').addEventListener('change', loadParticipants);
document.getElementById('progressFilter').addEventListener('change', loadParticipants);

// Show activity modal
function showActivityModal() {
    const activityModal = document.querySelector('.activity-modal');
    if (activityModal) {
        activityModal.classList.add('active');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadGoalDetails();
    loadParticipants();
    loadActions();
    
    // Initialize validation modal
    const validationModal = document.getElementById('validationModal');
    if (validationModal) {
        const closeBtn = validationModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                validationModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === validationModal) {
                validationModal.style.display = 'none';
            }
        });
    }

    // Setup activity modal close functionality
    const activityModal = document.querySelector('.activity-modal');
    if (activityModal) {
        const closeBtn = activityModal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                activityModal.classList.remove('active');
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === activityModal) {
                activityModal.classList.remove('active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const activityModal = document.createElement('div');
    activityModal.className = 'modal activity-modal';
    activityModal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn">&times;</button>
            <h2>Add Progress Activity</h2>
            
            <div class="activity-types">
                <div class="activity-type-card" data-type="action">
                    <h3>Action-Based</h3>
                    <p>Installation, setup, and implementation of sustainable solutions</p>
                </div>
                <div class="activity-type-card" data-type="educational">
                    <h3>Educational</h3>
                    <p>Blogs, videos, and awareness campaigns</p>
                </div>
                <div class="activity-type-card" data-type="community">
                    <h3>Community Engagement</h3>
                    <p>Events, challenges, and fundraising activities</p>
                </div>
                <div class="activity-type-card" data-type="purchase">
                    <h3>Purchasing & Selling</h3>
                    <p>Eco-friendly products and brand promotion</p>
                </div>
                <div class="activity-type-card" data-type="monitoring">
                    <h3>Monitoring & Reporting</h3>
                    <p>Usage tracking and measurement activities</p>
                </div>
            </div>

            <div class="activity-form"></div>
        </div>
    `;
    document.body.appendChild(activityModal);

    const activityForms = {
        action: `
            <div class="activity-form-group">
                <label>Activity Title</label>
                <input type="text" placeholder="e.g., Installed Water-Efficient Fixtures">
            </div>
            <div class="activity-form-group">
                <label>Description</label>
                <textarea placeholder="Describe the action taken and its impact"></textarea>
            </div>
            <div class="activity-form-group">
                <label>Date Completed</label>
                <input type="date">
            </div>
            <div class="activity-form-group">
                <label>Resources Used</label>
                <input type="text" placeholder="List materials, tools, or resources used">
            </div>
            <button class="activity-submit-btn">Submit Activity</button>
        `,
        educational: `
            <div class="activity-form-group">
                <label>Content Type</label>
                <select>
                    <option value="blog">Blog Post</option>
                    <option value="video">Video Content</option>
                    <option value="workshop">Workshop</option>
                    <option value="campaign">Awareness Campaign</option>
                </select>
            </div>
            <div class="activity-form-group">
                <label>Title</label>
                <input type="text" placeholder="Enter content title">
            </div>
            <div class="activity-form-group">
                <label>Content</label>
                <textarea placeholder="Write your content or provide a description"></textarea>
            </div>
            <div class="activity-form-group">
                <label>Media Upload</label>
                <div class="media-upload-area">
                    <p>Drop your files here or click to upload</p>
                    <input type="file" hidden>
                </div>
            </div>
            <button class="activity-submit-btn">Publish Content</button>
        `,
        community: `
            <div class="activity-form-group">
                <label>Event Type</label>
                <select>
                    <option value="event">Community Event</option>
                    <option value="challenge">Challenge</option>
                    <option value="fundraising">Fundraising</option>
                </select>
            </div>
            <div class="activity-form-group">
                <label>Event Title</label>
                <input type="text" placeholder="Enter event title">
            </div>
            <div class="activity-form-group">
                <label>Date & Time</label>
                <input type="datetime-local">
            </div>
            <div class="activity-form-group">
                <label>Location</label>
                <input type="text" placeholder="Enter event location">
            </div>
            <div class="activity-form-group">
                <label>Description</label>
                <textarea placeholder="Describe the event and its goals"></textarea>
            </div>
            <button class="activity-submit-btn">Create Event</button>
        `,
        purchase: `
            <div class="activity-form-group">
                <label>Transaction Type</label>
                <select>
                    <option value="purchase">Purchase</option>
                    <option value="sale">Sale</option>
                    <option value="promotion">Brand Promotion</option>
                </select>
            </div>
            <div class="activity-form-group">
                <label>Product/Service Name</label>
                <input type="text" placeholder="Enter product or service name">
            </div>
            <div class="activity-form-group">
                <label>Amount</label>
                <input type="number" placeholder="Enter amount">
            </div>
            <div class="activity-form-group">
                <label>Description</label>
                <textarea placeholder="Describe the eco-friendly aspects"></textarea>
            </div>
            <button class="activity-submit-btn">Record Transaction</button>
        `,
        monitoring: `
            <div class="activity-form-group">
                <label>Metric Type</label>
                <select>
                    <option value="water">Water Usage</option>
                    <option value="energy">Energy Consumption</option>
                    <option value="waste">Waste Management</option>
                    <option value="carbon">Carbon Footprint</option>
                </select>
            </div>
            <div class="activity-form-group">
                <label>Reading/Value</label>
                <input type="number" placeholder="Enter measurement value">
            </div>
            <div class="activity-form-group">
                <label>Unit</label>
                <input type="text" placeholder="e.g., liters, kWh, kg">
            </div>
            <div class="activity-form-group">
                <label>Date</label>
                <input type="date">
            </div>
            <div class="activity-form-group">
                <label>Notes</label>
                <textarea placeholder="Add any additional observations"></textarea>
            </div>
            <button class="activity-submit-btn">Log Reading</button>
        `
    };

    // Event Listeners
    document.querySelectorAll('.progress-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activityModal.classList.add('active');
        });
    });

    activityModal.querySelector('.close-btn').addEventListener('click', () => {
        activityModal.classList.remove('active');
    });

    const activityForm = activityModal.querySelector('.activity-form');
    document.querySelectorAll('.activity-type-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.activity-type-card').forEach(c => {
                c.classList.remove('selected');
            });
            card.classList.add('selected');
            const type = card.dataset.type;
            activityForm.innerHTML = activityForms[type];
        });
    });

    // Close modal when clicking outside
    activityModal.addEventListener('click', (e) => {
        if (e.target === activityModal) {
            activityModal.classList.remove('active');
        }
    });

    // Handle form submissions
    activityModal.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        activityModal.classList.remove('active');
    });
});
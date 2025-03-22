// Function to toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Function to show modal
function showModal() {
    const modal = document.getElementById('registerModal');
    new bootstrap.Modal(modal).show();
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('registerModal');
    bootstrap.Modal.getInstance(modal).hide();
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('registerModal');
    if (event.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal on escape key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Function to handle registration form submission
function handleRegistration(event) {
    event.preventDefault();
    
    // Get form elements
    const form = event.target;
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const interests = Array.from(form.querySelectorAll('input[name="interests[]"]:checked')).map(checkbox => checkbox.value);
    const terms = form.terms.checked;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('active');
        error.style.display = 'none';
    });
    
    // Validate form
    let isValid = true;
    
    if (fullName.length < 2) {
        const nameError = document.getElementById('nameError');
        nameError.textContent = 'Please enter a valid name';
        nameError.classList.add('active');
        nameError.style.display = 'block';
        isValid = false;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        const emailError = document.getElementById('emailError');
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('active');
        emailError.style.display = 'block';
        isValid = false;
    }
    
    if (password.length < 8) {
        const passwordError = document.getElementById('passwordError');
        passwordError.textContent = 'Password must be at least 8 characters long';
        passwordError.classList.add('active');
        passwordError.style.display = 'block';
        isValid = false;
    }
    
    if (!terms) {
        const termsError = document.getElementById('termsError');
        if (termsError) {
            termsError.textContent = 'Please accept the terms and conditions';
            termsError.classList.add('active');
            termsError.style.display = 'block';
        }
        return;
    }
    
    if (isValid) {
        // Here you would typically send the data to your backend
        console.log('Registration data:', { fullName, email, interests });
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Registration successful! Welcome to 5%.Earth';
        form.appendChild(successMessage);
        
        // Close modal and reset form after a short delay
        setTimeout(() => {
            closeModal();
            form.reset();
            successMessage.remove();
        }, 2000);
    }
}

// Handle media upload functionality
function handleMediaUpload(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.createElement('div');
                preview.className = 'media-preview';
                
                const mediaElement = file.type.startsWith('image/') 
                    ? document.createElement('img')
                    : document.createElement('video');
                
                mediaElement.src = e.target.result;
                if (mediaElement.tagName === 'VIDEO') {
                    mediaElement.controls = true;
                }
                
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-media';
                removeButton.innerHTML = '<i class="fas fa-times"></i>';
                removeButton.onclick = () => preview.remove();
                
                preview.appendChild(mediaElement);
                preview.appendChild(removeButton);
                document.getElementById('mediaPreviews').appendChild(preview);
            };
            reader.readAsDataURL(file);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Set up media upload area event listeners
    const mediaUploadArea = document.getElementById('mediaUploadArea');
    if (mediaUploadArea) {
        mediaUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mediaUploadArea.classList.add('dragover');
        });

        mediaUploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mediaUploadArea.classList.remove('dragover');
        });

        mediaUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mediaUploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleMediaUpload(files);
        });

        mediaUploadArea.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            fileInput.accept = 'image/*,video/*';
            fileInput.onchange = (e) => handleMediaUpload(e.target.files);
            fileInput.click();
        });
    }

    // Add click event listener to Join Now buttons
    const joinButtons = document.querySelectorAll('.primary-btn');
    joinButtons.forEach(button => {
        if (button.textContent.trim() === 'Join Now') {
            button.addEventListener('click', showModal);
        }
    });
    
    // Tab switching functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const postContent = document.querySelector('.activity-content');

    if (filterBtns && postContent) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                // Hide all content first
                const allPosts = postContent.querySelectorAll('.post-item');
                const allMentions = postContent.querySelectorAll('.mention-item');
                const allSaved = postContent.querySelectorAll('.saved-item');

                allPosts.forEach(post => post.style.display = 'none');
                allMentions.forEach(mention => mention.style.display = 'none');
                allSaved.forEach(saved => saved.style.display = 'none');

                // Show relevant content based on selected tab
                if (this.textContent === 'Posts') {
                    allPosts.forEach(post => post.style.display = 'block');
                } else if (this.textContent === 'My Posts') {
                    allPosts.forEach(post => post.style.display = 'block');
                } else if (this.textContent === 'Mentions') {
                    allMentions.forEach(mention => mention.style.display = 'block');
                } else if (this.textContent === 'Saved') {
                    allSaved.forEach(saved => saved.style.display = 'block');
                }
            });
        });

        // Show My Posts by default
        const defaultTab = document.querySelector('.filter-btn.active');
        if (defaultTab) {
            defaultTab.click();
        }
    }

    // Dynamic form fields based on goal category
    goalCategory.addEventListener('change', function() {
        const category = this.value;
        const goalMetric = document.getElementById('goalMetric');
        
        // Clear existing options
        goalMetric.innerHTML = `<option value="">Select Metric</option>
                                <option value="kg-co2">kg CO2</option>
                                <option value="kwh">kWh</option>
                                <option value="liters">Liters</option>
                                <option value="kg-waste">kg Waste</option>
                                <option value="trees">Trees</option>
                                <option value="custom">Custom</option>`;
        
        // Set metric options based on category
        switch(category) {
            case 'carbon-reduction':
                goalMetric.value = 'kg-co2';
                break;
            case 'waste-reduction':
                goalMetric.value = 'kg-waste';
                break;
            case 'energy-efficiency':
                goalMetric.value = 'kwh';
                break;
            case 'water-conservation':
                goalMetric.value = 'liters';
                break;
            case 'biodiversity':
                goalMetric.value = 'trees';
                break;
            case 'sustainable-living':
                goalMetric.value = 'custom';
                break;
            default:
                goalMetric.value = '';
        }
    });
});

// Sample post data - In a real app, this would come from an API
const posts = [
    {
        id: 10,
        author: {
            name: 'Michael Chen',
            avatar: 'images/profile-man-2.jpg',
            timeAgo: '1 day ago'
        },
        type: 'goal',
        title: 'Urban Composting Network',
        content: 'Excited to launch our community composting initiative! 🌱 Our goal is to establish 5 neighborhood composting stations by 2024.',
        description: 'A community-driven initiative to reduce organic waste and create nutrient-rich soil for local gardens through a network of neighborhood composting stations.',
        image: 'images/waste-management.jpeg',
        category: 'waste-management',
        target: 5,
        metric: 'composting stations',
        progress: 0,
        startDate: '2024-01-20',
        endDate: '2024-12-31',
        milestones: '1. Site selection and community engagement (Feb 2024)\n2. First station setup and training (Apr 2024)\n3. Three stations operational (Aug 2024)\n4. All five stations running (Dec 2024)',
        stats: {
            likes: 45,
            comments: []
        }
    },{
        id: 301,
        author: {
            name: 'Green Tech Solutions',
            avatar: 'images/GreenTechSolutions.jpeg',
            timeAgo: '6 hours ago'
        },
        type: 'project-update',
        title: 'Solar Innovation Project Launch',
        content: 'Proud to announce our latest solar innovation project! 🌞 Were developing new high-efficiency panels that will increase energy output by 30%. Join us in revolutionizing renewable energy. #GreenTech #Innovation',
        image: 'images/solar-farm.jpeg',
        link: 'organization.html',
        stats: {
            likes: 245,
            comments: []
        }
    },
    {
        id: 1,
        author: {
            name: 'Sarah Johnson',
            avatar: 'images/profile-woman.png',
            timeAgo: '2 hours ago'
        },
        type: 'quick-post',
        title: 'Cleanup at Brighton Beach!',
        content: 'Just witnessed an amazing community cleanup at Brighton Beach! 🌊 Over 50 volunteers came together to collect plastic waste. Small actions, big impact! #OceanCleanup #Sustainability',
        image: 'images/ocean-clan.webp',
        goal: {
            id: 2,
            title: 'Zero Waste Challenge',
            category: 'waste-reduction',
            goalTarget: 1000,
            metric: 'kg waste',
            currentProgress: 400,
            contribution: 25
        },
        stats: {
            likes: 128,
            comments: [
                {
                    id: 101,
                    text: 'This is amazing! We need more initiatives like this.',
                    author: 'John Smith',
                    timestamp: '2023-12-10 14:30:00'
                },
                {
                    id: 102,
                    text: 'I would love to join next time! When is the next cleanup?',
                    author: 'Emma Davis',
                    timestamp: '2023-12-10 15:15:00'
                }
            ]
        }
    },
    {
        id: 202,
        author: {
            name: 'Admin',
            avatar: 'images/admin.jpeg',
            timeAgo: '2 day ago'
        },
        type: 'system',
        title: 'Goal Milestone Achievement',
        content: 'Congratulations! The community has reached 75% of the Zero Waste Challenge goal! Together we have prevented 1500kg of waste from reaching landfills. Keep up the great work! 🌍♻️',
        timestamp: new Date().toLocaleString(),
        goal: {
            id: 4,
            title: 'Zero Waste Challenge',
            category: 'waste-reduction',
            goalTarget: 2000,
            metric: 'kg waste',
            currentProgress: 1500,
            milestone: '75%'
        },
        stats: {
            likes: 245,
            comments: []
        }
    },
    {
        id: 11,
        author: {
            name: 'Emily Rodriguez',
            avatar: 'images/profile-woman-2.avif',
            timeAgo: '3 days ago'
        },
        type: 'goal',
        title: 'Solar for Schools',
        content: 'Launching an initiative to install solar panels in 10 local schools! 🌞 Help us bring renewable energy education and sustainable power to our education system.',
        description: 'A comprehensive project to install solar panels across 10 local schools, reducing energy costs and providing hands-on renewable energy education opportunities.',
        image: 'images/solar-farm.jpeg',
        category: 'renewable-energy',
        target: 500,
        metric: 'kW capacity',
        progress: 0,
        startDate: '2024-02-01',
        endDate: '2025-01-31',
        milestones: '1. School assessment and planning (Feb-Mar 2024)\n2. First three schools installation (Apr-Jun 2024)\n3. Next four schools installation (Jul-Oct 2024)\n4. Final three schools completion (Nov 2024-Jan 2025)',
        stats: {
            likes: 89,
            comments: []
        }
    },
    {
        id: 2,
        author: {
            name: 'Green Tech Solutions',
            avatar: 'images/profile-man.avif',
            timeAgo: '1 day ago'
        },
        type: 'blog',
        title: 'Solar Installation Success!',
        content: 'Successfully completed our latest solar panel installation project! This installation will help reduce carbon emissions by 50 tons annually. 🌞 #RenewableEnergy #Sustainability',
        image: 'images/solar-solutions.jpg',
        goal: {
            id: 3,
            title: 'Solar Panel Installation',
            category: 'energy-efficiency',
            goalTarget: 10000,
            metric: 'kWh',
            currentProgress: 7500,
            contribution: 500
        },
        stats: {
            likes: 342,
            comments: [
                {
                    id: 201,
                    text: 'This is groundbreaking! How soon until this technology is available?',
                    author: 'Tech Enthusiast',
                    timestamp: '2023-12-09 10:00:00'
                },
                {
                    id: 202,
                    text: 'Great innovation! Would love to see this implemented in developing countries.',
                    author: 'Global Impact',
                    timestamp: '2023-12-09 11:30:00'
                }
            ]
        }
    },
    {
        id: 302,
        author: {
            name: 'Ocean Conservation Alliance',
            avatar: 'images/ocean-conservation.avif',
            timeAgo: '1 day ago'
        },
        type: 'initiative',
        title: 'Coastal Cleanup Drive Success',
        content: 'Our latest coastal cleanup drive removed 500kg of plastic waste! 🌊 Thanks to all volunteers and partners. Together, we are making our oceans cleaner. #OceanConservation #MarineLife',
        image: 'images/ocean-clan.webp',
        link: 'organization.html',
        stats: {
            likes: 189,
            comments: []
        }
    },
    {
        id: 3,
        author: {
            name: 'EcoAware Initiative',
            avatar: 'images/profile-woman-2.avif',
            timeAgo: '2 days ago'
        },
        type: 'poll',
        title: 'Which sustainable practice do you find most effective?',
        pollOptions: [
            { text: 'Composting', percentage: 45 },
            { text: 'Solar Panels', percentage: 30 },
            { text: 'Rain Water Harvesting', percentage: 15 },
            { text: 'Electric Vehicles', percentage: 10 }
        ],
        pollStats: '1,234 votes • 2 days left',
        stats: {
            likes: 892,
            comments: [
                {
                    id: 301,
                    text: 'All of these are important, but composting is often overlooked!',
                    author: 'Green Thumb',
                    timestamp: '2023-12-08 09:45:00'
                },
                {
                    id: 302,
                    text: 'Electric vehicles are the future, but we need better infrastructure.',
                    author: 'Future Driver',
                    timestamp: '2023-12-08 10:20:00'
                }
            ]
        }
    },
    {
        id: 12,
        author: {
            name: 'David Kim',
            avatar: 'images/profile-man.avif',
            timeAgo: '5 days ago'
        },
        type: 'goal',
        title: 'Wildlife Corridor Project',
        content: 'Starting a crucial biodiversity initiative! 🦋 Our goal: Create 3 urban wildlife corridors connecting existing green spaces.',
        description: 'An urban biodiversity project to establish three wildlife corridors that connect existing green spaces, enhancing habitat connectivity and supporting local wildlife populations.',
        image: 'images/wildlife-sanctuary.jpeg',
        category: 'biodiversity',
        target: 3,
        metric: 'corridors',
        progress: 0,
        startDate: '2024-03-01',
        endDate: '2025-12-31',
        milestones: '1. Environmental impact study and route planning (Mar-May 2024)\n2. First corridor development (Jun-Dec 2024)\n3. Second corridor implementation (Jan-Jun 2025)\n4. Final corridor completion (Jul-Dec 2025)',
        stats: {
            likes: 67,
            comments: []
        }
    },
    {
        id: 203,
        type: 'system',
        author: {
            name: 'Admin',
            avatar: 'images/admin.jpeg',
            timeAgo: '2 day ago'
        },
        title: 'Badge Earned',
        content: 'Sarah Johnson has earned the "Waste Warrior" badge for contributing to 10 waste reduction goals! 🏆 This badge recognizes dedicated commitment to reducing waste and promoting recycling.',
        timestamp: new Date().toLocaleString(),
        badge: {
            name: 'Waste Warrior',
            level: 'Gold',
            icon: '🏆',
            category: 'waste-reduction'
        },
        stats: {
            likes: 156,
            comments: []
        }
    },
    {
        id: 201,
        type: 'blog',
        title: 'Revolutionizing Waste Management',
        content: 'Discover how our new recycling initiative is transforming the way we handle waste...',
        image: 'images/waste-management.webp',
        goal: {
            id: 4,
            title: 'Zero Waste Challenge',
            category: 'waste-reduction',
            goalTarget: 2000,
            metric: 'kg waste',
            currentProgress: 1400,
            contribution: 32
        },
        author: {
            id: 1,
            name: 'Sarah Jain',
            avatar: 'images/profile-woman.png',
            profile: 'user-profile.html',
            timeAgo: '11 days ago'
        },
        stats: {
            likes: 98,
            comments: [
                {
                    id: 301,
                    text: 'All of these are important, but composting is often overlooked!',
                    author: 'Green Thumb',
                    timestamp: '2023-12-08 09:45:00'
                }
            ]
        },
        trending: true,
        timestamp: '2024-01-15T10:30:00Z'
    },
    {
        id: 204,
        type: 'system',
        author: {
            name: 'Admin',
            avatar: 'images/admin.jpeg',
            timeAgo: '12 day ago'
        },
        title: 'Goal Completed',
        content: 'Amazing achievement! The Solar Panel Installation project has reached its goal of 10,000 kWh renewable energy generation! This will reduce our carbon footprint by approximately 7,000 kg CO2 annually. 🌞⚡',
        timestamp: new Date().toLocaleString(),
        goal: {
            id: 3,
            title: 'Solar Panel Installation',
            category: 'energy-efficiency',
            goalTarget: 10000,
            metric: 'kWh',
            currentProgress: 10000,
            milestone: '100%'
        },
        stats: {
            likes: 412,
            comments: []
        }
    },
    {
        id: 202,
        type: 'quick-post',
        title: 'Solar Panel Installation Tips',
        content: 'Quick guide on maximizing solar panel efficiency through proper installation...',
        image: 'images/solar-solutions.jpg',
        author: {
            id: 2,
            name: 'Mike Chen',
            avatar: 'images/profile-man.avif',
            profile: 'user-profile.html',
            timeAgo: '12 days ago'
        },
        stats: {
            likes: 76,
            comments: [
                {
                    id: 301,
                    text: 'All of these are important, but composting is often overlooked!',
                    author: 'Green Thumb',
                    timestamp: '2023-12-08 09:45:00'
                }
            ]
        },
        trending: false,
        timestamp: '2024-01-14T15:45:00Z'
    },
    {
        id: 203,
        type: 'media',
        title: 'Ocean Cleanup Documentary',
        content: 'Watch our latest documentary on innovative ocean cleanup technologies...',
        image: 'images/ocean-conservation.avif',
        author: {
            id: 3,
            name: 'Emma Wilson',
            avatar: 'images/profile-woman-2.avif',
            profile: 'user-profile.html',
            timeAgo: '12 days ago'
        },
        stats: {
            likes: 22,
            comments: [
                {
                    id: 301,
                    text: 'All of these are important, but composting is often overlooked!',
                    author: 'Green Thumb',
                    timestamp: '2023-12-08 09:45:00'
                }
            ]
        },
        trending: true,
        timestamp: '2024-01-13T09:20:00Z'
    },
    {
        id: 204,
        type: 'event',
        title: 'Earth Day Celebration 2024',
        date: new Date('2024-01-15'),
        time: '10:00 AM - 05:00 PM',
        location: 'City Park, New York',
        description: 'Join us for a day of environmental awareness and community action...',
        image: 'images/green-earth.jpg',
        goal: {
            id: 5,
            title: 'Go Green Neighborhood',
            category: 'plantation',
            goalTarget: 1000,
            metric: 'trees',
            currentProgress: 600,
            contribution: 15
        },
        author: {
            id: 1,
            name: 'Sarah Jain',
            avatar: 'images/profile-woman.png',
            profile: 'user-profile.html',
            timeAgo: '13 days ago'
        },
        stats: {
            likes: 89,
            comments: [
                {
                    id: 301,
                    text: 'All of these are important, but composting is often overlooked!',
                    author: 'Green Thumb',
                    timestamp: '2023-12-08 09:45:00'
                }
            ]
        },
        trending: false,
        timestamp: '2024-01-12T14:15:00Z'
    },
    {
        id: 205,
        type: 'poll',
        title: 'Community Green Initiative',
        preview: 'Vote on the next environmental project for our community...',
        pollOptions: [
            { text: 'Green Building', percentage: 60 },
            { text: 'Recycling Drive', percentage: 40 }
        ],
        options: [
            'Green Building',
            'Recycling Drive'
        ],
        pollStats: '320 votes • 1 week left',
        image: 'images/green-project-placeholder.jpg',
        author: {
            id: 4,
            name: 'Lisa Thompson',
            avatar: 'images/profile-woman.png',
            profile: 'user-profile.html',
            timeAgo: '13 days ago'
        },
        stats: {
            likes: 112,
            comments: [
                {
                    id: 301,
                    text: 'All of these are important, but composting is often overlooked!',
                    author: 'Green Thumb',
                    timestamp: '2023-12-08 09:45:00'
                }
            ]
        },
        trending: true,
        timestamp: '2024-01-11T11:30:00Z'
    },
    {
        id: 206,
        type: 'blog',
        title: 'Urban Farming Revolution',
        content: 'How cities are transforming unused spaces into productive gardens...',
        image: 'images/green-tech.jpeg',
        author: {
            id: 2,
            name: 'Mike Chen',
            avatar: 'images/profile-man.avif',
            profile: 'user-profile.html',
            timeAgo: '13 days ago'
        },
        stats: {
            likes: 87,
            comments: [
                {
                    id: 301,
                    text: 'All of these are important, but composting is often overlooked!',
                    author: 'Green Thumb',
                    timestamp: '2023-12-08 09:45:00'
                }
            ]
        },
        trending: false,
        timestamp: '2024-01-10T16:45:00Z'
    },
    {
        id: 207,
        type: 'quick-post',
        title: 'Electric Vehicle Adoption',
        content: 'Latest statistics on EV adoption and its environmental impact...',
        image: 'images/electric-mobility.jpeg',
        author: {
            id: 3,
            name: 'Emma Wilson',
            avatar: 'images/profile-woman-2.avif',
            profile: 'user-profile.html',
            timeAgo: '15 days ago'
        },
        stats: {
            likes: 134,
            comments: [
                {
                    id: 301,
                    text: 'All of these are important, but composting is often overlooked!',
                    author: 'Green Thumb',
                    timestamp: '2023-12-08 09:45:00'
                }
            ]
        },
        trending: true,
        timestamp: '2024-01-09T13:20:00Z'
    }
];

const currentUser = {
    id: 1,
    name: 'Rik Pant',
    avatar: 'images/profile-man.avif',
    timeAgo: 'Online'
};

const quickPostBtn = document.getElementById('quick-post-btn');
const postsContainer = document.querySelector('.posts-container');
const textarea = document.querySelector('textarea');


const blogPostBtn = document.getElementById('blog-post-btn');

const mediaPostBtn = document.getElementById('media-post-btn');

const pollPostBtn = document.getElementById('poll-post-btn');

const eventPostBtn = document.getElementById('event-post-btn');

const greenProjectPostBtn = document.getElementById('green-project-post-btn');

const goalPostBtn = document.getElementById('goal-post-btn');

// Get all post type buttons and post editors
const postTypeBtns = document.querySelectorAll('.post-type-btn');
const postEditors = document.querySelectorAll('.post-editor');

document.addEventListener('DOMContentLoaded', () => {
    // Handle post type button clicks
    postTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and add to clicked button
            postTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Hide all post editors
            postEditors.forEach(editor => editor.classList.remove('active'));

            // Show the corresponding editor
            const type = this.getAttribute('data-type');
            if (type === 'quick-post') {
                document.querySelector('.quick-post-form').classList.add('active');
            } else if (type === 'blog') {
                document.querySelector('.blog-post-form').classList.add('active');
            } else if (type === 'media') {
                document.querySelector('.media-post-form').classList.add('active');
            } else if (type === 'poll') {
                document.querySelector('.poll-post-form').classList.add('active');
            } else if (type === 'event') {
                document.querySelector('.event-post-form').classList.add('active');
            } else if (type === 'green-project') {
                document.querySelector('.green-project-post-form').classList.add('active');
            } else if (type === 'goal') {
                document.querySelector('.goal-post-form').classList.add('active');
            }
        });
    });

    // Only add event listeners if elements exist
    if (textarea) {
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handlePostCreation();
            }
        });
    }

    // Post creation functionality - only add if button exists
    if (quickPostBtn) {
        quickPostBtn.addEventListener('click', handlePostCreation);
    }

    // Handle blog post submission
    if (blogPostBtn) {
        blogPostBtn.addEventListener('click', handleBlogPost);
    }

    // Handle media post submission
    if (mediaPostBtn) {
        mediaPostBtn.addEventListener('click', handleMediaPost);
    }

    // Handle poll post submission
    if (pollPostBtn) {
        pollPostBtn.addEventListener('click', handlePollPost);
    }

    // Handle event post submission
    if (eventPostBtn) {
        eventPostBtn.addEventListener('click', handleEventPost);
    }

    // Handle event post submission
    if (greenProjectPostBtn) {
        greenProjectPostBtn.addEventListener('click', handleGreenProjectPost);
    }

    // Handle goal post submission
    if (goalPostBtn) {
        goalPostBtn.addEventListener('click', handleGoalPost);
    }

    // Global handlers for post interactions
    window.handleLike = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            renderPosts();
        }
    };

    window.handleComment = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            const comment = prompt('Add your comment:');
            if (comment?.trim()) {
                post.comments.push({
                    id: Date.now(),
                    text: comment,
                    author: 'Current User',
                    timestamp: new Date().toLocaleString()
                });
                renderPosts();
            }
        }
    };

    window.handleShare = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            // In a real app, this would open a share dialog
            alert('Sharing functionality would be implemented here!');
        }
    };

    // Initialize the posts when the page loads
    initializePosts();
});

function handlePostCreation() {
    const postContent = textarea.value;
    if (postContent.trim() == '') {
        alert('Please fill in all fields');
        return;
    }

    // Collect media previews
    const mediaPreviews = [];
    document.querySelectorAll('.media-preview').forEach(preview => {
        const mediaElement = preview.querySelector('img, video');
        if (mediaElement) {
            mediaPreviews.push({
                type: mediaElement.tagName.toLowerCase(),
                src: mediaElement.src
            });
        }
    });

    // Collect location tag if present
    const locationTag = document.querySelector('.location-tag');
    const location = locationTag ? `${locationTag.querySelector('span').textContent}` : null;

    // Get selected author from post-as-selector
    const postAsSelector = document.querySelector('.post-as-selector');
    const selectedAuthor = postAsSelector ? {
        name: postAsSelector.options[postAsSelector.selectedIndex].text,
        id: postAsSelector.value,
        avatar: postAsSelector.value.startsWith('org') ? `images/GreenTechSolutions.jpeg` : currentUser.avatar,
        timeAgo: 'Just now'
    } : currentUser;

    const post = {
        id: Date.now(),
        content: postContent,
        title: postContent,
        description: postContent,
        stats: {
            likes: 0,
            comments: []
        },
        timestamp: new Date().toLocaleString(),
        author: selectedAuthor,
        sustainabilityScore: calculateSustainabilityScore(postContent),
        tags: extractEnvironmentalTags(postContent),
        media: mediaPreviews,
        location: location,
        type: 'quick-post'
    };

    const goalSelect = document.getElementById('quickPostGoal');
    if (goalSelect && mockUserGoals[goalSelect.value]) {
        const goal = mockUserGoals[goalSelect.value];
        post.goal = goal;

        const actions = getRelevantActionTypes(goal.category, "quick-post");
        const actionSelect = document.getElementById('quickPostGoalAction');
        if (actionSelect) {
            const selectedAction = actions.filter(item => item.value == actionSelect.value);
            if (actionSelect && actionSelect.length > 1) {
                post.action = selectedAction[0];    
            } else {
                post.action = selectedAction;
            }
            const progressDiv = document.getElementById('quickPostGoalProgress');
            const progressInput = progressDiv.querySelector('.contribution-value');
            if (progressInput) {
                post.goal.contribution = parseInt(progressInput.value);
            }
        }
    }
    // Create post with media and location
    createPost(post);

    // Clear input and preview areas
    textarea.value = '';
    document.querySelectorAll('.media-preview').forEach(preview => preview.remove());
    if (locationTag) locationTag.remove();

    goalSelect.selectedIndex = 0;
    toggleActionTypeSelector(goalSelect);

    // Add animation effect
    textarea.style.borderColor = 'var(--success-color)';
    setTimeout(() => {
        textarea.style.borderColor = '#ddd';
    }, 1000);
}

function handleBlogPost() {
    const titleInput = document.querySelector('.blog-title');
    const categorySelect = document.querySelector('.blog-category');
    const contentTextarea = document.querySelector('.blog-content');

    const title = titleInput.value.trim();
    const category = categorySelect.value;
    const content = contentTextarea.value.trim();

    if (!title || !category || !content) {
        alert('Please fill in all fields');
        return;
    }

    // Collect media previews
    const mediaPreviews = [];
    document.querySelectorAll('.media-preview').forEach(preview => {
        const mediaElement = preview.querySelector('img, video');
        if (mediaElement) {
            mediaPreviews.push({
                type: mediaElement.tagName.toLowerCase(),
                src: mediaElement.src
            });
        }
    });

    const post = {
        id: Date.now(),
        title: title,
        category: category,
        content: content,
        description: content,
        stats: {
            likes: 0,
            comments: []
        },
        timestamp: new Date().toLocaleString(),
        author: document.querySelector('.post-as-selector') ? {
            name: document.querySelector('.post-as-selector').options[document.querySelector('.post-as-selector').selectedIndex].text,
            id: document.querySelector('.post-as-selector').value,
            avatar: document.querySelector('.post-as-selector').value.startsWith('org') ? `images/GreenTechSolutions.jpeg` : currentUser.avatar,
            timeAgo: 'Just now'
        } : currentUser,
        sustainabilityScore: calculateSustainabilityScore(content || title),
        tags: extractEnvironmentalTags(content || title),
        media: mediaPreviews,
        type: 'blog'
    };

    const goalSelect = document.getElementById('blogGoal');
    if (goalSelect && mockUserGoals[goalSelect.value]) {
        const goal = mockUserGoals[goalSelect.value];
        post.goal = goal;

        const actions = getRelevantActionTypes(goal.category, "blog");
        const actionSelect = document.getElementById('blogGoalAction');
        if (actionSelect) {
            const selectedAction = actions.filter(item => item.value == actionSelect.value);
            if (actionSelect && actionSelect.length > 1) {
                post.action = selectedAction[0];    
            } else {
                post.action = selectedAction;
            }
            const progressDiv = document.getElementById('blogGoalProgress');
            const progressInput = progressDiv.querySelector('.contribution-value');
            if (progressInput) {
                post.goal.contribution = parseInt(progressInput.value);
            }
        }
    }
    // Create post with media and location
    createPost(post);

    // Clear input and preview areas
    titleInput.value = '';
    categorySelect.value = '';
    contentTextarea.value = '';
    document.querySelectorAll('.media-preview').forEach(preview => preview.remove());

    goalSelect.selectedIndex = 0;
    toggleActionTypeSelector(goalSelect);

    // Add animation effect
    const blogForm = document.querySelector('.blog-title');
    blogForm.style.borderColor = 'var(--success-color)';
    setTimeout(() => {
        blogForm.style.borderColor = '#ddd';
    }, 1000);

    // Switch back to quick post form
    document.querySelector('.post-type-btn[data-type="quick-post"]').click();
}

function handleMediaPost() {
    const caption = document.querySelector('.media-caption').value;
    
    // Collect media previews
    const mediaPreviews = [];
    document.querySelectorAll('.media-preview').forEach(preview => {
        const mediaElement = preview.querySelector('img, video');
        if (mediaElement) {
            mediaPreviews.push({
                type: mediaElement.tagName.toLowerCase(),
                src: mediaElement.src
            });
        }
    });

    // Collect location tag if present
    const locationTag = document.querySelector('.location-tag');
    const location = locationTag ? `${locationTag.querySelector('span').textContent}` : null;

    const post = {
        id: Date.now(),
        content: caption,
        title: caption,
        description: caption,
        stats: {
            likes: 0,
            comments: []
        },
        timestamp: new Date().toLocaleString(),
        author: document.querySelector('.post-as-selector') ? {
            name: document.querySelector('.post-as-selector').options[document.querySelector('.post-as-selector').selectedIndex].text,
            id: document.querySelector('.post-as-selector').value,
            avatar: document.querySelector('.post-as-selector').value.startsWith('org') ? `images/GreenTechSolutions.jpeg` : currentUser.avatar,
            timeAgo: 'Just now'
        } : currentUser,
        sustainabilityScore: calculateSustainabilityScore(caption),
        tags: extractEnvironmentalTags(caption),
        media: mediaPreviews,
        location: location,
        type: 'media'
    };

    const goalSelect = document.getElementById('mediaGoal');
    if (goalSelect && mockUserGoals[goalSelect.value]) {
        const goal = mockUserGoals[goalSelect.value];
        post.goal = goal;

        const actions = getRelevantActionTypes(goal.category, "media");
        const actionSelect = document.getElementById('mediaGoalAction');
        if (actionSelect) {
            const selectedAction = actions.filter(item => item.value == actionSelect.value);
            if (actionSelect && actionSelect.length > 1) {
                post.action = selectedAction[0];    
            } else {
                post.action = selectedAction;
            }
            const progressDiv = document.getElementById('mediaGoalProgress');
            const progressInput = progressDiv.querySelector('.contribution-value');
            if (progressInput) {
                post.goal.contribution = parseInt(progressInput.value);
            }
        }
    }
    // Create post with media and location
    createPost(post);

    // Clear form
    document.querySelector('.media-caption').value = '';
    document.querySelectorAll('.media-preview').forEach(preview => preview.remove());
    if (locationTag) locationTag.remove();

    goalSelect.selectedIndex = 0;
    toggleActionTypeSelector(goalSelect);

    // Add animation effect
    const captionInput = document.querySelector('.media-caption');
    captionInput.style.borderColor = 'var(--success-color)';
    setTimeout(() => {
        captionInput.style.borderColor = '#ddd';
    }, 1000);

    // Switch back to quick post form
    document.querySelector('.post-type-btn[data-type="quick-post"]').click();
}

function handlePollPost() {
    const pollQuestion = document.querySelector('.poll-question').value;
    const pollOptions = Array.from(document.querySelectorAll('.poll-option')).map(option => option.value);
    const duration = document.querySelector('.duration-select').value;
    const allowMultipleChoices = document.querySelector('.multiple-choice-checkbox').checked;

    if (pollQuestion.trim() == '' || pollOptions.every(option => option.trim() == '')) {
        return;
    }
    
    const post = {
        id: Date.now(),
        content: pollQuestion,
        title: pollQuestion,
        description: pollQuestion,
        pollOptions: pollOptions,
        duration: duration,
        allowMultipleChoices: allowMultipleChoices,
        stats: {
            likes: 0,
            comments: []
        },
        timestamp: new Date().toLocaleString(),
        author: document.querySelector('.post-as-selector') ? {
            name: document.querySelector('.post-as-selector').options[document.querySelector('.post-as-selector').selectedIndex].text,
            id: document.querySelector('.post-as-selector').value,
            avatar: document.querySelector('.post-as-selector').value.startsWith('org') ? `images/GreenTechSolutions.jpeg` : currentUser.avatar,
            timeAgo: 'Just now'
        } : currentUser,
        sustainabilityScore: calculateSustainabilityScore(pollQuestion),
        tags: extractEnvironmentalTags(pollQuestion),
        type: 'poll'
    };

    const goalSelect = document.getElementById('pollGoal');
    if (goalSelect && mockUserGoals[goalSelect.value]) {
        const goal = mockUserGoals[goalSelect.value];
        post.goal = goal;

        const actions = getRelevantActionTypes(goal.category, "poll");
        const actionSelect = document.getElementById('pollGoalAction');
        if (actionSelect) {
            const selectedAction = actions.filter(item => item.value == actionSelect.value);
            if (actionSelect && actionSelect.length > 1) {
                post.action = selectedAction[0];    
            } else {
                post.action = selectedAction;
            }
            const progressDiv = document.getElementById('pollGoalProgress');
            const progressInput = progressDiv.querySelector('.contribution-value');
            if (progressInput) {
                post.goal.contribution = parseInt(progressInput.value);
            }
        }
    }
    // Create post with media and location
    createPost(post);

    // Clear form
    document.querySelector('.poll-question').value = '';
    document.querySelectorAll('.poll-option').forEach(option => option.value = '');
    document.querySelector('.duration-select').value = '1';
    document.querySelector('.multiple-choice-checkbox').checked = false;

    goalSelect.selectedIndex = 0;
    toggleActionTypeSelector(goalSelect);

    // Add success animation
    const pollForm = document.querySelector('.poll-question');
    pollForm.style.borderColor = 'var(--success-color)';
    setTimeout(() => {
        pollForm.style.borderColor = '#ddd';
    }, 1000);

    // Switch back to quick post form
    document.querySelector('.post-type-btn[data-type="quick-post"]').click();
}

function handleEventPost() {
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventDescription = document.getElementById('eventDescription').value;

    // Collect media previews
    const mediaPreviews = [];
    document.querySelectorAll('.media-preview').forEach(preview => {
        const mediaElement = preview.querySelector('img, video');
        if (mediaElement) {
            mediaPreviews.push({
                type: mediaElement.tagName.toLowerCase(),
                src: mediaElement.src
            });
        }
    });

    // Collect location tag if present
    const locationTag = document.querySelector('.location-tag');
    const location = locationTag ? `${locationTag.querySelector('span').textContent}` : null;

    const post = {
        id: Date.now(),
        content: eventDescription,
        title: eventTitle,
        description: eventDescription,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        description: eventDescription,
        stats: {
            likes: 0,
            comments: []
        },
        timestamp: new Date().toLocaleString(),
        author: document.querySelector('.post-as-selector') ? {
            name: document.querySelector('.post-as-selector').options[document.querySelector('.post-as-selector').selectedIndex].text,
            id: document.querySelector('.post-as-selector').value,
            avatar: document.querySelector('.post-as-selector').value.startsWith('org') ? `images/GreenTechSolutions.jpeg` : currentUser.avatar,
            timeAgo: 'Just now'
        } : currentUser,
        sustainabilityScore: calculateSustainabilityScore(eventDescription || eventTitle),
        tags: extractEnvironmentalTags(eventDescription || eventTitle),
        media: mediaPreviews,
        location: location,
        type: 'event'
    };

    const goalSelect = document.getElementById('eventGoal');
    if (goalSelect && mockUserGoals[goalSelect.value]) {
        const goal = mockUserGoals[goalSelect.value];
        post.goal = goal;

        const actions = getRelevantActionTypes(goal.category, "event");
        const actionSelect = document.getElementById('eventGoalAction');
        if (actionSelect) {
            const selectedAction = actions.filter(item => item.value == actionSelect.value);
            if (actionSelect && actionSelect.length > 1) {
                post.action = selectedAction[0];    
            } else {
                post.action = selectedAction;
            }
            const progressDiv = document.getElementById('eventGoalProgress');
            const progressInput = progressDiv.querySelector('.contribution-value');
            if (progressInput) {
                post.goal.contribution = parseInt(progressInput.value);
            }
        }
    }
    // Create post with media and location
    createPost(post);

    // Clear form
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventLocation').value = '';
    document.getElementById('eventDescription').value = '';
    document.querySelectorAll('.media-preview').forEach(preview => preview.remove());
    if (locationTag) locationTag.remove();

    goalSelect.selectedIndex = 0;
    toggleActionTypeSelector(goalSelect);

    // Add animation effect
    const eventForm = document.getElementById('eventTitle');
    eventForm.style.borderColor = 'var(--success-color)';
    setTimeout(() => {
        eventForm.style.borderColor = '#ddd';
    }, 1000);

    // Switch back to quick post form
    document.querySelector('.post-type-btn[data-type="quick-post"]').click();
}

function handleGreenProjectPost() {
    const projectTitle = document.getElementById('projectTitle').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const projectGoals = document.getElementById('projectGoals').value;
    const projectStartDate = document.getElementById('projectStartDate').value;
    const projectEndDate = document.getElementById('projectEndDate').value;
    const projectResources = document.getElementById('projectResources').value;

    if (!projectTitle || !projectDescription || !projectGoals || !projectStartDate || !projectEndDate || !projectResources) {
        alert('Please fill in all required fields');
        return;
    }

    const startDate = new Date(projectStartDate);
    const endDate = new Date(projectEndDate);
    if (endDate < startDate) {
        alert('End date cannot be earlier than start date');
        return;
    }

    
    const mediaPreviews = [];
    document.querySelectorAll('.media-preview').forEach(preview => {
        const mediaElement = preview.querySelector('img, video');
        if (mediaElement) {
            mediaPreviews.push({
                type: mediaElement.tagName.toLowerCase(),
                src: mediaElement.src
            });
        }
    });

    const post = {
        id: Date.now(),
        content: projectDescription,
        title: projectTitle,
        description: projectDescription,
        goals: projectGoals,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        resources: projectResources,
        stats: {
            likes: 0,
            comments: []
        },
        timestamp: new Date().toLocaleString(),
        author: document.querySelector('.post-as-selector') ? {
            name: document.querySelector('.post-as-selector').options[document.querySelector('.post-as-selector').selectedIndex].text,
            id: document.querySelector('.post-as-selector').value,
            avatar: document.querySelector('.post-as-selector').value.startsWith('org') ? `images/GreenTechSolutions.jpeg` : currentUser.avatar,
            timeAgo: 'Just now'
        } : currentUser,
        sustainabilityScore: calculateSustainabilityScore(projectDescription || projectTitle),
        tags: extractEnvironmentalTags(projectDescription || projectTitle),
        media: mediaPreviews,
        type: 'green-project'
    };

    const goalSelect = document.getElementById('projectGoal');
    if (goalSelect && mockUserGoals[goalSelect.value]) {
        const goal = mockUserGoals[goalSelect.value];
        post.goal = goal;

        const actions = getRelevantActionTypes(goal.category, "project");
        const actionSelect = document.getElementById('projectGoalAction');
        if (actionSelect) {
            const selectedAction = actions.filter(item => item.value == actionSelect.value);
            if (actionSelect && actionSelect.length > 1) {
                post.action = selectedAction[0];    
            } else {
                post.action = selectedAction;
            }
            const progressDiv = document.getElementById('projectGoalProgress');
            const progressInput = progressDiv.querySelector('.contribution-value');
            if (progressInput) {
                post.goal.contribution = parseInt(progressInput.value);
            }
        }
    }
    // Create post with media and location
    createPost(post);

    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectGoals').value = '';
    document.getElementById('projectStartDate').value = '';
    document.getElementById('projectEndDate').value = '';
    document.getElementById('projectResources').value = '';
    document.querySelectorAll('.media-preview').forEach(preview => preview.remove());

    goalSelect.selectedIndex = 0;
    toggleActionTypeSelector(goalSelect);

    const greenProjectForm = document.getElementById('projectTitle');
    greenProjectForm.style.borderColor = 'var(--success-color)';
    setTimeout(() => {
        greenProjectForm.style.borderColor = '#ddd';
    }, 1000);

    document.querySelector('.post-type-btn[data-type="quick-post"]').click();
}

function handleGoalPost() {
    const title = document.getElementById('goalTitle').value;
    const category = document.getElementById('goalCategory').value;
    const description = document.getElementById('goalDescription').value;
    const target = document.getElementById('goalTarget').value;
    const metric = document.getElementById('goalMetric').value;
    const goalStartDate = document.getElementById('goalStartDate').value;
    const goalEndDate = document.getElementById('goalEndDate').value;
    const milestones = document.getElementById('goalMilestones').value;

    if (!title || !category || !description || !target || !metric || !goalStartDate || !goalEndDate || !milestones) {
        alert('Please fill in all required fields');
        return;
    }

    const startDate = new Date(goalStartDate);
    const endDate = new Date(goalEndDate);
    if (endDate < startDate) {
        alert('End date cannot be earlier than start date');
        return;
    }

    
    const mediaPreviews = [];
    document.querySelectorAll('.media-preview').forEach(preview => {
        const mediaElement = preview.querySelector('img, video');
        if (mediaElement) {
            mediaPreviews.push({
                type: mediaElement.tagName.toLowerCase(),
                src: mediaElement.src
            });
        }
    });

    const post = {
        id: Date.now(),
        category: category,
        content: description,
        milestones: milestones,
        title: title,
        description: description,
        goals: category,
        target: target,
        metric: metric,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        resources: projectResources,
        stats: {
            likes: 0,
            comments: []
        },
        timestamp: new Date().toLocaleString(),
        author: document.querySelector('.post-as-selector') ? {
            name: document.querySelector('.post-as-selector').options[document.querySelector('.post-as-selector').selectedIndex].text,
            id: document.querySelector('.post-as-selector').value,
            avatar: document.querySelector('.post-as-selector').value.startsWith('org') ? `images/GreenTechSolutions.jpeg` : currentUser.avatar,
            timeAgo: 'Just now'
        } : currentUser,
        sustainabilityScore: calculateSustainabilityScore(milestones || description),
        tags: extractEnvironmentalTags(milestones || description),
        media: mediaPreviews,
        type: 'goal'
    };
    // Create post with media and location
    createPost(post);

    document.getElementById('goalTitle').value = '';
    document.getElementById('goalCategory').value = '';
    document.getElementById('goalDescription').value = '';
    document.getElementById('goalTarget').value = '';
    document.getElementById('goalMetric').value = '';
    document.getElementById('goalStartDate').value = '';
    document.getElementById('goalEndDate').value = '';
    document.getElementById('goalMilestones').value = '';
    document.querySelectorAll('.media-preview').forEach(preview => preview.remove());

    const goalForm = document.getElementById('goalTitle');
    goalForm.style.borderColor = 'var(--success-color)';
    setTimeout(() => {
        goalForm.style.borderColor = '#ddd';
    }, 1000);

    document.querySelector('.post-type-btn[data-type="quick-post"]').click();
}

function createPost(post) {
    // Add new post to the beginning of the posts array
    posts.unshift(post);
    
    // Only update the new post in the DOM
    const postsContainer = document.querySelector('.posts-container');
    if (postsContainer) {
        const postElement = document.createElement('div');
        postElement.className = 'post-container';
        postElement.setAttribute('data-post-id', post.id);
        postElement.appendChild(createPostCard(post));
        
        // Insert the new post at the beginning of the container
        if (postsContainer.firstChild) {
            postsContainer.insertBefore(postElement, postsContainer.firstChild);
        } else {
            postsContainer.appendChild(postElement);
        }
        
        // Animate the new post
        animateNewPost();
    }
}

function calculateSustainabilityScore(content) {
    // Simple scoring based on keywords (in a real app, this would be more sophisticated)
    const sustainabilityKeywords = ['recycle', 'sustainable', 'green', 'eco', 'environment', 'renewable', 'conservation'];
    return sustainabilityKeywords.reduce((score, keyword) => {
        return score + (content.toLowerCase().includes(keyword) ? 1 : 0);
    }, 0);
}

function extractEnvironmentalTags(content) {
    const tags = [];
    const commonTags = {
        'recycling': ['recycle', 'waste', 'plastic'],
        'energy': ['solar', 'renewable', 'wind'],
        'conservation': ['wildlife', 'forest', 'biodiversity'],
        'climate': ['climate', 'carbon', 'emission'],
        'water': ['water', 'ocean', 'marine']
    };

    Object.entries(commonTags).forEach(([category, keywords]) => {
        if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
            tags.push(category);
        }
    });

    return tags;
}

function renderTags(tags) {
    if (!tags.length) return '';
    return `
        <div class="post-tags">
            ${tags.map(tag => `<span class="tag">#${tag}</span>`).join(' ')}
        </div>
    `;
}

function renderSustainabilityScore(score) {
    const leaves = '🌿'.repeat(Math.min(score, 5));
    return score > 0 ? `
        <div class="sustainability-score" title="Sustainability Impact Score">
            ${leaves}
        </div>
    ` : '';
}

function animateNewPost() {
    const firstPost = postsContainer.firstElementChild;
    if (firstPost) {
        firstPost.style.opacity = '0';
        firstPost.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            firstPost.style.transition = 'all 0.3s ease';
            firstPost.style.opacity = '1';
            firstPost.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Function to create a post card element
function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'post-card';

    let count = 0;
    if (post.stats && post.stats.comments) {
        count = post.stats.comments.length;
    }

    article.innerHTML = `
        <div class="post-header">
            <a href="user-profile.html"><img src="${post.author.avatar}" alt="${post.author.name}" class="user-avatar"></a>
            <div class="post-meta">
                <a href="user-profile.html"><h3 class="user-name">${post.author.name}</h3></a>
                <span class="post-time">${post.author.timeAgo}</span>
            </div>
            <span class="post-type"><i class="fas ${getPostTypeIcon(post.type)}"></i> ${formatPostType(post.type)}</span>
        </div>
        ${getPostContent(post)}
        ${post.goal? createGoalProgressHTML(post.goal, post.action) : ''}
        ${post.media && post.media.length > 0 ? `
        <div class="post-media">
            ${post.media.map(media => 
                media.type === 'img' ? 
                `<img src="${media.src}" alt="Post media" class="post-media-item">` :
                `<video src="${media.src}" controls class="post-media-item"></video>`
            ).join('')}
        </div>` : ''}
        ${post.location ? `<div class="post-location"><i class="fas fa-map-marker-alt"></i> ${post.location}</div>` : ''}
        <div class="post-actions">
            <button class="action-btn"><i class="far fa-heart"></i> ${post.stats?.likes || 0}</button>
            <button class="action-btn"><i class="far fa-comment"></i> ${count}</button>
            <button class="action-btn"><i class="far fa-share-square"></i> Share</button>
        </div>
    `;

    article.setAttribute('data-post-id', post.id);

    return article;
}

// Function to create goal progress HTML
function createGoalProgressHTML(goal, action) {
    const percentage = goal.contribution ? 
                        ((goal.currentProgress + goal.contribution) / goal.goalTarget) * 100 
                        : ((goal.currentProgress) / goal.goalTarget) * 100;
    return `
        <div class="goal-progress-container">
            <div class="goal-info">
                <h3>Associated Goal:</h3>
                <h4>${goal.title}</h4>
                <span class="goal-category">${goal.category}</span>
            </div>
            ${action ? `
                <div class="action-info">
                    <h5>Action Type:</h5>
                    <h6>${action.text}</h6>
                    <span class="action-category">${action.value}</span>
                </div>
            ` : ''}
            <div class="goal-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-text">
                    Progress: ${goal.currentProgress} ${goal.metric} of ${goal.goalTarget} ${goal.metric} (${percentage.toFixed(1)}%)
                </div>
                ${goal.contribution ? `
                    <div class="contribution-input">
                        <span>Contribution: ${goal.contribution} ${goal.metric}</span>
                    </div>
                `: '' }
            </div>
        </div>
    `;
}

// Helper function to get post type icon
function getPostTypeIcon(type) {
    const icons = {
        'quick-post': 'fa-bolt',
        'blog': 'fa-blog',
        'media': 'fa-photo-video',
        'poll': 'fa-poll',
        'event': 'fa-calendar-alt',
        'goal': 'fa-bullseye'
    };
    return icons[type] || 'fa-bolt';
}

// Helper function to format post type display text
function formatPostType(type) {
    if (!type) return 'Post';
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Helper function to generate post content based on type
function getPostContent(post) {
    switch(post.type) {
        case 'goal':
            return `
                <div class="post-content goal-post">
                    <h3 class="goal-title">${post.title}</h3>
                    <div class="goal-meta">
                        <span class="goal-category"><i class="fas fa-tag"></i> ${post.category}</span>
                        <span class="goal-target"><i class="fas fa-bullseye"></i> Target: ${post.target} ${post.metric}</span>
                        <span class="goal-timeline"><i class="fas fa-calendar"></i> ${new Date(post.startDate).toLocaleDateString()} - ${new Date(post.endDate).toLocaleDateString()}</span>
                    </div>
                    <p class="goal-description">${post.description}</p>
                    <div class="goal-milestones">
                        <h4><i class="fas fa-flag"></i> Key Milestones</h4>
                        <p>${post.milestones}</p>
                    </div>
                    ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ''}
                    ${post.document ? `<div class="goal-document">
                        <i class="fas fa-file-alt"></i>
                        <a href="${post.document}" target="_blank">View Document</a>
                    </div>` : ''}
                </div>
            `;
        case 'blog':
            return `
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p class="post-excerpt">${post.content}</p>
                    ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ''}
                    <button class="read-more-btn">Read More</button>
                </div>
            `;
        case 'poll':
            return `
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <div class="poll-options">
                        ${post.pollOptions.map(option => `
                            ${option ? `<div class="poll-option">
                                <div class="poll-bar" style="width: ${option.percentage ? option.percentage : 0 }%;">${option.text ? option.text : option} (${option.percentage ? option.percentage : 0}%)</div>
                            </div>` : ''}
                        `).join('')}
                    </div>
                    <p class="poll-stats">${post.pollStats}</p>
                </div>
            `;
        case 'event':
            return `
                <div class="post-content event-post">
                    <h3>${post.title}</h3>
                    <div class="event-details">
                        <p><i class="far fa-calendar"></i> ${post.date} at ${post.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${post.location}</p>
                    </div>
                    <p class="event-description">${post.description}</p>
                </div>
            `;
        case 'green-project':
            return `
                <div class="post-content green-project-post">
                    <h3>${post.title}</h3>
                    <p class="project-description">${post.description}</p>
                    <div class="project-details">
                        <div class="project-section">
                            <h4><i class="fas fa-bullseye"></i> Project Goals</h4>
                            <p>${post.goals}</p>
                        </div>
                        <div class="project-section">
                            <h4><i class="fas fa-calendar-alt"></i> Timeline</h4>
                            <p>Start: ${new Date(post.startDate).toLocaleDateString()}</p>
                            <p>End: ${new Date(post.endDate).toLocaleDateString()}</p>
                        </div>
                        <div class="project-section">
                            <h4><i class="fas fa-tools"></i> Required Resources</h4>
                            <p>${post.resources}</p>
                        </div>
                    </div>
                </div>
            `;
        default:
            return `
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : ''}
                </div>
            `;
    }
}

// Initialize posts container
function initializePosts() {
    const postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) return;

    // Clear existing content
    postsContainer.innerHTML = '';

    // Add posts
    const allPosts = [...posts];
    allPosts.forEach(post => {
        postsContainer.appendChild(createPostCard(post));
    });

    // Initialize post interactions
    initializePostInteractions();
}

function renderPosts(filteredPosts=posts) {
    const postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) return;

    // Clear existing content
    postsContainer.innerHTML = '';

    // Add posts
    filteredPosts.forEach(post => {
        postsContainer.appendChild(createPostCard(post));
    });

    // Re-initialize post interactions after rendering
    initializePostInteractions();
}

// Initialize post interactions
function initializePostInteractions() {
    // Like button functionality
    document.querySelectorAll('.action-btn').forEach(btn => {
        const heartIcon = btn.querySelector('.fa-heart');
        if (heartIcon) {
            btn.addEventListener('click', function() {
                if (heartIcon.classList.contains('far')) {
                    heartIcon.classList.replace('far', 'fas');
                    const likes = parseInt(this.textContent) + 1;
                    this.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;
                } else {
                    heartIcon.classList.replace('fas', 'far');
                    const likes = parseInt(this.textContent) - 1;
                    this.innerHTML = `<i class="far fa-heart"></i> ${likes}`;
                }
            });
        }
    });
}

// Media button handlers
function initializeMediaButtons() {
    const mediaButtons = document.querySelectorAll('.media-btn');
    mediaButtons.forEach(btn => {
        btn.addEventListener('click', handleMediaButtonClick);
    });
}

function handleMediaButtonClick(event) {
    const button = event.currentTarget;
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('fa-camera')) {
        handleImageUpload();
    } else if (icon.classList.contains('fa-video')) {
        handleVideoUpload();
    } else if (icon.classList.contains('fa-map-marker-alt')) {
        handleLocationTag();
    }
}

function handleImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.multiple = true;
    input.id = 'imageUpload';
    input.name = 'imageUpload';

    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    addMediaPreview('image', e.target.result, file.name);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    input.click();
}

function handleVideoUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.capture = 'environment';
    input.multiple = true;
    input.id = 'videoUpload';
    input.name = 'videoUpload';

    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    addMediaPreview('video', e.target.result, file.name);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    input.click();
}

function handleLocationTag() {
    if ('geolocation' in navigator) {
        const input = document.createElement('input');
        input.type = 'geolocation';
        input.id = 'locationTag';
        input.name = 'locationTag';
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                reverseGeocode(latitude, longitude);
                input.value = position;
            },
            error => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please try again.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

function reverseGeocode(lat, lon) {
    // Using OpenStreetMap Nominatim API for reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            const locationName = data.display_name;
            addLocationTag(locationName, lat, lon);
        })
        .catch(error => {
            console.error('Error reverse geocoding:', error);
            alert('Unable to get location details. Please try again.');
        });
}

function addMediaPreview(type, src, filename) {
    const previewContainer = document.createElement('div');
    previewContainer.className = 'media-preview thumbnail';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-media-btn';
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    removeBtn.onclick = () => previewContainer.remove();

    previewContainer.appendChild(removeBtn);
    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = filename;
        img.className = 'thumbnail-preview';
        img.style.width = '150px';
        img.style.height = '150px';
        img.style.objectFit = 'cover';
        previewContainer.appendChild(img);
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.className = 'thumbnail-preview';
        video.style.width = '150px';
        video.style.height = '150px';
        video.style.objectFit = 'cover';
        previewContainer.appendChild(video);
    }

    document.querySelector('.post-editor').insertBefore(
        previewContainer,
        document.querySelector('.post-actions')
    );
}

function addLocationTag(locationName, lat, lon) {
    const locationTag = document.createElement('div');
    locationTag.className = 'location-tag';
    locationTag.innerHTML = `
        <i class="fas fa-map-marker-alt"></i>
        <span>${locationName}</span>
        <button class="remove-location-btn">
            <i class="fas fa-times"></i>
        </button>
    `;

    locationTag.querySelector('.remove-location-btn').onclick = () => locationTag.remove();

    // Store coordinates as data attributes
    locationTag.dataset.lat = lat;
    locationTag.dataset.lon = lon;

    document.querySelector('.post-editor').insertBefore(
        locationTag,
        document.querySelector('.post-actions')
    );
}

// Initialize media buttons when DOM is loaded
// Handle media upload functionality
function handleMediaUpload(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.createElement('div');
                preview.className = 'media-preview';
                
                const mediaElement = file.type.startsWith('image/') 
                    ? document.createElement('img')
                    : document.createElement('video');
                
                mediaElement.src = e.target.result;
                if (mediaElement.tagName === 'VIDEO') {
                    mediaElement.controls = true;
                }
                
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-media';
                removeButton.innerHTML = '<i class="fas fa-times"></i>';
                removeButton.onclick = () => preview.remove();
                
                preview.appendChild(mediaElement);
                preview.appendChild(removeButton);
                document.getElementById('mediaPreviews').appendChild(preview);
            };
            reader.readAsDataURL(file);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeMediaButtons();
});

// Mock user goals data for testing
const mockUserGoals = [
    { 
        id: 1, 
        title: "Reduce Carbon Footprint", 
        category: "carbon-reduction",
        goalTarget: 5000,
        metric: "kg CO2",
        currentProgress: 2500
    },
    { 
        id: 2, 
        title: "Zero Waste Challenge", 
        category: "waste-reduction",
        goalTarget: 1000,
        metric: "kg waste",
        currentProgress: 400
    },
    { 
        id: 3, 
        title: "Solar Panel Installation", 
        category: "energy-efficiency",
        goalTarget: 10000,
        metric: "kWh",
        currentProgress: 7500
    },
    { 
        id: 4, 
        title: "Water Conservation Project", 
        category: "water-conservation",
        goalTarget: 50000,
        metric: "liters",
        currentProgress: 35000
    }
];

// Function to toggle action type selector visibility and update options based on goal category and post type
function toggleActionTypeSelector(goalSelector) {
    const actionTypeSelector = goalSelector.parentElement.querySelector('.action-type-selector');
    const postTypeSelector = goalSelector.parentElement.parentElement.querySelector('.post-type-selector');
    const postType = postTypeSelector ? postTypeSelector.value : null;
    const progressContainer = goalSelector.parentElement.querySelector('.goal-progress-container');

    if (goalSelector.value) {
        // Find the selected goal's category and progress
        const selectedGoal = mockUserGoals.find(goal => goal.id === parseInt(goalSelector.value));
        const category = selectedGoal ? selectedGoal.category : null;
        
        // Update progress display
        if (progressContainer) {
            const percentage = (selectedGoal.currentProgress / selectedGoal.goalTarget) * 100;
            progressContainer.innerHTML = `
                <div class="goal-progress">
                    <div class="progress-bar" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-text">
                    Progress: ${selectedGoal.currentProgress} ${selectedGoal.metric} of ${selectedGoal.goalTarget} ${selectedGoal.metric} (${percentage.toFixed(1)}%)
                </div>
                <div class="contribution-input">
                    <input type="number" id="progressContribution" class="contribution-value" placeholder="Enter your contribution" min="0" step="0.01">
                    <span>${selectedGoal.metric}</span>
                </div>
                <div class="contribution-preview"></div>
            `;
            progressContainer.style.display = 'block';
            
            // Add event listener for contribution input
            const contributionInput = progressContainer.querySelector('.contribution-value');
            const contributionPreview = progressContainer.querySelector('.contribution-preview');
            
            contributionInput.addEventListener('input', (e) => {
                const contributionValue = parseFloat(e.target.value) || 0;
                const newProgress = selectedGoal.currentProgress + contributionValue;
                const newPercentage = (newProgress / selectedGoal.goalTarget) * 100;
                
                if (contributionValue > 0) {
                    contributionPreview.textContent = `New progress will be: ${newProgress} ${selectedGoal.metric} (${newPercentage.toFixed(1)}%)`;
                    contributionPreview.style.display = 'block';
                } else {
                    contributionPreview.style.display = 'none';
                }
            });
        }
        
        // Clear existing options except the first one
        while (actionTypeSelector.options.length > 1) {
            actionTypeSelector.remove(1);
        }
        
        // Add relevant action types based on goal category and post type
        const actionTypes = getRelevantActionTypes(category, postType);
        actionTypes.forEach(action => {
            const option = document.createElement('option');
            option.value = action.value;
            option.textContent = action.text;
            actionTypeSelector.appendChild(option);
        });
        
        actionTypeSelector.style.display = 'block';
    } else {
        actionTypeSelector.style.display = 'none';
        actionTypeSelector.value = '';
        if (progressContainer) {
            progressContainer.style.display = 'none';
            progressContainer.value = '';
        }
    }
}

// Function to get relevant action types based on goal category and post type
function getRelevantActionTypes(category, postType) {
    const commonActions = [
        { value: 'educational', text: 'Educational (Blogs & Awareness)' },
        { value: 'community', text: 'Community Engagement (Events & Challenges)' }
    ];
    
    const categorySpecificActions = {
        'carbon-reduction': [
            { value: 'action-based', text: 'Action-Based (Carbon Offset Projects)' },
            { value: 'monitoring', text: 'Monitoring & Reporting (Carbon Footprint Tracking)' }
        ],
        'waste-reduction': [
            { value: 'action-based', text: 'Action-Based (Recycling & Composting)' },
            { value: 'purchasing', text: 'Purchasing & Selling (Zero-Waste Products)' }
        ],
        'energy-efficiency': [
            { value: 'action-based', text: 'Action-Based (Energy System Installation)' },
            { value: 'monitoring', text: 'Monitoring & Reporting (Energy Usage Tracking)' }
        ],
        'water-conservation': [
            { value: 'action-based', text: 'Action-Based (Water-Saving Implementation)' },
            { value: 'monitoring', text: 'Monitoring & Reporting (Water Usage Tracking)' }
        ]
    };

    const postTypeActions = {
        'quick-post': [
            { value: 'action-based', text: 'Action-Based (Quick Updates & Progress)' },
            { value: 'monitoring', text: 'Monitoring & Reporting (Quick Stats)' }
        ],
        'blog': [
            { value: 'educational', text: 'Educational (Detailed Articles)' },
            { value: 'monitoring', text: 'Monitoring & Reporting (Analysis & Insights)' }
        ],
        'poll': [
            { value: 'community', text: 'Community Engagement (Surveys & Polls)' },
            { value: 'educational', text: 'Educational (Knowledge Assessment)' }
        ],
        'event': [
            { value: 'community', text: 'Community Engagement (Events & Meetups)' },
            { value: 'action-based', text: 'Action-Based (Group Activities)' }
        ],
        'milestone': [
            { value: 'monitoring', text: 'Monitoring & Reporting (Achievement Tracking)' },
            { value: 'action-based', text: 'Action-Based (Goal Progress)' }
        ],
        'project': [
            { value: 'action-based', text: 'Action-Based (Project Implementation)' },
            { value: 'monitoring', text: 'Monitoring & Reporting (Project Progress)' }
        ],
        'media': [
            { value: 'educational', text: 'Educational (Learning Resources)' },
            { value: 'community', text: 'Community Engagement (Knowledge Sharing)' }
        ],
        'innovation': [
            { value: 'action-based', text: 'Action-Based (Innovation Implementation)' },
            { value: 'educational', text: 'Educational (Innovation Insights)' }
        ]
    };

    let relevantActions = [];

    // Add category-specific actions if category exists
    if (category && categorySpecificActions[category]) {
        relevantActions = [...categorySpecificActions[category]];
    }

    // Add post-type-specific actions if post type exists
    if (postType && postTypeActions[postType]) {
        relevantActions = [...relevantActions, ...postTypeActions[postType]];
    }

    // Add common actions if no specific actions found or as additional options
    return relevantActions.length > 0 ? [...new Set([...relevantActions, ...commonActions])] : commonActions;
}

// Function to populate goal selectors with user's goals
function populateGoalSelectors() {
    // Get all goal selectors
    const goalSelectors = document.querySelectorAll('.goal-selector');
    
    // For testing, use mockUserGoals instead of localStorage
    const userGoals = mockUserGoals;
    
    // Populate each selector
    goalSelectors.forEach(selector => {
        // Clear existing options except the first one
        while (selector.options.length > 1) {
            selector.remove(1);
        }
        
        // Add user's goals as options
        userGoals.forEach(goal => {
            const option = document.createElement('option');
            option.value = goal.id;
            option.textContent = goal.title;
            selector.appendChild(option);
        });
    });
}

// Initialize goal selectors when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateGoalSelectors();
});
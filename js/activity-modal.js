document.addEventListener('DOMContentLoaded', () => {
    const activityModal = document.createElement('div');
    activityModal.className = 'modal activity-modal';
    activityModal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn">&times;</button>
            <h2>Add Activity</h2>
            
            <div class="activity-form-group">
                <label>Activity Type</label>
                <select id="activityTypeSelect">
                    <option value="quick-post">Quick Post</option>
                    <option value="blog">Blog Post</option>
                    <option value="media">Media Upload</option>
                    <option value="event">Event</option>
                    <option value="green-project">Green Project</option>
                    <option value="daily-activity">Daily Activity</option>
                </select>
            </div>

            <div id="activityFormContainer" class="activity-form-container">
                <!-- Form will be dynamically inserted here -->
            </div>
        </div>
    `;
    document.body.appendChild(activityModal);

    const activityForms = {
        'quick-post': `
            <div class="activity-form-group">
                <label>Title</label>
                <input type="text" name="title" placeholder="What's on your mind?">
            </div>
            <div class="activity-form-group">
                <label>Description</label>
                <textarea name="description" placeholder="Share your thoughts..."></textarea>
            </div>
            <div class="activity-form-group">
                <div class="action-buttons">
                    <button type="button" class="like-btn"><i class="far fa-heart"></i></button>
                    <button type="button" class="share-btn"><i class="fas fa-share-alt"></i></button>
                </div>
            </div>
            <button type="submit" class="activity-submit-btn">Post</button>
        `,
        'blog': `
            <div class="activity-form-group">
                <label>Title</label>
                <input type="text" name="title" placeholder="Blog title">
            </div>
            <div class="activity-form-group">
                <label>Content</label>
                <textarea name="content" class="rich-text-editor" placeholder="Write your blog post..."></textarea>
            </div>
            <div class="activity-form-group">
                <label>Tags</label>
                <input type="text" name="tags" placeholder="Add tags (comma separated)">
            </div>
            <button type="submit" class="activity-submit-btn">Publish Blog</button>
        `,
        'media': `
            <div class="activity-form-group">
                <label>Title</label>
                <input type="text" name="title" placeholder="Media title">
            </div>
            <div class="activity-form-group">
                <label>Media Type</label>
                <select name="mediaType">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                </select>
            </div>
            <div class="activity-form-group">
                <label>Upload Media</label>
                <div class="media-upload-area">
                    <input type="file" name="mediaFile">
                    <p>Drag & drop files here or click to upload</p>
                </div>
            </div>
            <div class="activity-form-group">
                <label>Description</label>
                <textarea name="description" placeholder="Describe your media..."></textarea>
            </div>
            <button type="submit" class="activity-submit-btn">Upload Media</button>
        `,
        'event': `
            <div class="activity-form-group">
                <label>Event Title</label>
                <input type="text" name="title" placeholder="Event title">
            </div>
            <div class="activity-form-group">
                <label>Date & Time</label>
                <input type="datetime-local" name="datetime">
            </div>
            <div class="activity-form-group">
                <label>Location</label>
                <input type="text" name="location" placeholder="Event location">
            </div>
            <div class="activity-form-group">
                <label>Description</label>
                <textarea name="description" placeholder="Event details..."></textarea>
            </div>
            <button type="submit" class="activity-submit-btn">Create Event</button>
        `,
        'green-project': `
            <div class="activity-form-group">
                <label>Project Title</label>
                <input type="text" name="title" placeholder="Project title">
            </div>
            <div class="activity-form-group">
                <label>Project Type</label>
                <select name="projectType">
                    <option value="conservation">Conservation</option>
                    <option value="renewable-energy">Renewable Energy</option>
                    <option value="waste-management">Waste Management</option>
                    <option value="sustainable-agriculture">Sustainable Agriculture</option>
                </select>
            </div>
            <div class="activity-form-group">
                <label>Description</label>
                <textarea name="description" placeholder="Project details..."></textarea>
            </div>
            <div class="activity-form-group">
                <label>Goals & Objectives</label>
                <textarea name="goals" placeholder="Project goals..."></textarea>
            </div>
            <button type="submit" class="activity-submit-btn">Create Project</button>
        `,
        'daily-activity': `
            <div class="activity-form-group">
                <label>Objective</label>
                <select name="activityType">
                    <option value="water-conservation">Water Conservation</option>
                    <option value="energy-saving">Energy Saving</option>
                    <option value="waste-reduction">Waste Reduction</option>
                    <option value="sustainable-transport">Sustainable Transport</option>
                </select>
            </div>
            <div class="activity-form-group">
                <label>Description</label>
                <textarea name="description" placeholder="What did you do today?"></textarea>
            </div>
            <div class="activity-form-group">
                <label>Impact Measurement</label>
                <input type="number" name="impact" placeholder="e.g., liters of water saved">
                <select name="unit">
                    <option value="liters">Liters</option>
                    <option value="kwh">kWh</option>
                    <option value="kg">Kilograms</option>
                    <option value="km">Kilometers</option>
                </select>
            </div>
            <button type="submit" class="activity-submit-btn">Log Activity</button>
        `
    };

    // Event Listeners
    const activityTypeSelect = activityModal.querySelector('#activityTypeSelect');
    const formContainer = activityModal.querySelector('#activityFormContainer');

    activityTypeSelect.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        formContainer.innerHTML = activityForms[selectedType];
    });

    // Initialize with first form type
    formContainer.innerHTML = activityForms['quick-post'];

    // Show modal function
    window.showActivityModal = () => {
        activityModal.classList.add('active');
    };

    // Close modal when clicking close button
    activityModal.querySelector('.close-btn').addEventListener('click', () => {
        activityModal.classList.remove('active');
    });

    // Close modal when clicking outside
    activityModal.addEventListener('click', (e) => {
        if (e.target === activityModal) {
            activityModal.classList.remove('active');
        }
    });

    // Handle form submission
    formContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const activityData = {
            type: activityTypeSelect.value,
            data: Object.fromEntries(formData),
            timestamp: new Date().toISOString(),
            userId: getCurrentUserId() // Implement this function to get current user ID
        };

        // TODO: Send activity data to server
        console.log('Activity Data:', activityData);
        
        // Close modal after submission
        activityModal.classList.remove('active');
    });
});
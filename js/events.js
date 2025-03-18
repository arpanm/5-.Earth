document.addEventListener('DOMContentLoaded', function() {
    const createEventBtn = document.getElementById('createEventBtn');
    const createEventModal = document.getElementById('createEventModal');
    const closeBtn = document.querySelector('.close-btn');
    const createEventForm = document.getElementById('createEventForm');
    const rsvpButtons = document.querySelectorAll('.rsvp-btn');
    const likeButtons = document.querySelectorAll('.like-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');

    // Modal functionality
    createEventBtn.addEventListener('click', () => {
        createEventModal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        createEventModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === createEventModal) {
            createEventModal.classList.remove('active');
        }
    });

    // Form submission
    createEventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value,
            image: document.getElementById('eventImage').files[0],
            attendees: 1
        };

        if (formData.image) {
            formData.image = URL.createObjectURL(formData.image);
        } else {
            formData.image = 'images/green-earth.jpg';
        }

        // Create event card HTML
        const eventCard = createEventCard(formData);

        // Add to Upcoming Events
        const upcomingEventsGrid = document.querySelector('#upcoming-events .events-grid');
        upcomingEventsGrid.insertAdjacentHTML('afterbegin', eventCard);

        // Add to My Events
        const myEventsGrid = document.querySelector('#my-events .events-grid');
        myEventsGrid.insertAdjacentHTML('afterbegin', createMyEventCard(formData));
        
        // Close modal and reset form
        createEventModal.style.display = 'none';
        createEventForm.reset();
    });

    // RSVP functionality
    rsvpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isGoing = this.classList.contains('going');
            if (isGoing) {
                this.classList.remove('going');
                this.textContent = 'RSVP Now';
            } else {
                this.classList.add('going');
                this.textContent = 'Going ✓';
            }
        });
    });

    // Like functionality
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isLiked = this.classList.contains('liked');
            const likeCount = parseInt(this.textContent.match(/\d+/)[0]);
            
            if (isLiked) {
                this.classList.remove('liked');
                this.innerHTML = `<i class="far fa-heart"></i> ${likeCount - 1}`;
            } else {
                this.classList.add('liked');
                this.innerHTML = `<i class="fas fa-heart"></i> ${likeCount + 1}`;
            }
        });
    });

    // Comment functionality
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // TODO: Implement comment section toggle
            console.log('Comment button clicked');
        });
    });

    // Function to create event card HTML
    function createEventCard(formData) {
        const eventDate = new Date(`${formData.date} ${formData.time}`);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        const formattedTime = eventDate.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit'
        });

        return `
            <div class="event-card">
                <img src="${formData.image}" alt="Event Image">
                <div class="event-info">
                    <h3>${formData.title}</h3>
                    <div class="event-date">${formattedDate} • ${formattedTime}</div>
                    <div class="event-location">${formData.location}</div>
                    <p class="event-description">${formData.description}</p>
                    <div class="event-stats">
                        <span><i class="fas fa-users"></i> 1 Going</span>
                        <span><i class="far fa-clock"></i> ${formattedTime}</span>
                    </div>
                    <button class="rsvp-btn">Going ✓</button>
                </div>
            </div>
        `;
    }
});
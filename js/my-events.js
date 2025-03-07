let eventsGrid;
let myEvents = [];

function createMyEventCard(event) {
    return `
        <div class="event-card" data-event-id="${event.id}">
            <img src="${event.image}" alt="${event.title}">
            <div class="event-info">
                <h3>${event.title}</h3>
                <div class="event-date">
                    <i class="fas fa-calendar"></i> ${event.date}
                </div>
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i> ${event.location}
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-stats">
                    <span><i class="fas fa-users"></i> ${event.attendees} attendees</span>
                </div>
                <div class="event-actions">
                    <button class="edit-btn" onclick="editEvent(${event.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn" onclick="deleteEvent(${event.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `;
}

function displayMyEvents() {
    if (eventsGrid) {
        eventsGrid.innerHTML = '';
        myEvents.forEach(event => {
            eventsGrid.innerHTML += createMyEventCard(event);
        });
    }
}

// Update event function
function updateEvent(eventId) {
    const event = myEvents.find(e => e.id === eventId);
    if (event) {
        event.title = document.getElementById('eventTitle').value;
        event.date = document.getElementById('eventDate').value;
        event.location = document.getElementById('eventLocation').value;
        event.description = document.getElementById('eventDescription').value;

        // Close modal and refresh display
        const modal = document.querySelector('.modal');
        modal.style.display = 'none';
        displayMyEvents();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const myEventsTab = document.querySelector('.my-events-tab');
    eventsGrid = document.querySelector('#my-events .events-grid');

    // Mock user data - In a real app, this would come from a backend
    const currentUser = {
        id: 1,
        name: 'John Doe'
    };

    // Mock events data - In a real app, this would come from a backend
    myEvents = [
        {
            id: 1,
            title: 'Beach Cleanup Drive',
            date: '2023-12-15',
            location: 'Sunny Beach',
            description: 'Join us for a community beach cleanup event',
            image: 'images/ocean-conservation.avif',
            attendees: 45
        },
        {
            id: 2,
            title: 'Tree Planting Initiative',
            date: '2023-12-20',
            location: 'City Park',
            description: 'Help us plant 100 trees in our local park',
            image: 'images/reforestation.jpg',
            attendees: 30
        }
    ];

    // Edit event function
    window.editEvent = function(eventId) {
        const event = myEvents.find(e => e.id === eventId);
        if (event) {
            // Populate modal with event details
            document.getElementById('eventTitle').value = event.title;
            document.getElementById('eventDate').value = event.date;
            document.getElementById('eventLocation').value = event.location;
            document.getElementById('eventDescription').value = event.description;
            
            // Show modal
            const modal = document.querySelector('.modal');
            modal.style.display = 'block';

            // Update submit button to handle edit
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.textContent = 'Update Event';
            submitBtn.onclick = function() {
                updateEvent(eventId);
            };
        }
    };

    // Delete event function
    window.deleteEvent = function(eventId) {
        if (confirm('Are you sure you want to delete this event?')) {
            const index = myEvents.findIndex(e => e.id === eventId);
            if (index !== -1) {
                myEvents.splice(index, 1);
                displayMyEvents();
            }
        }
    };

    // Initialize display only if we're on the my-events tab
    const myEventsContent = document.getElementById('my-events');
    if (myEventsContent) {
        displayMyEvents();
    }
});
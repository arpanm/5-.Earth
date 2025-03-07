document.addEventListener('DOMContentLoaded', function() {
    const rsvpButtons = document.querySelectorAll('.rsvp-btn');

    rsvpButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'RSVP Now') {
                this.textContent = 'Going ✓';
                this.style.backgroundColor = 'var(--primary-dark)';
                this.disabled = true;

                // Optional: Add animation or transition effect
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);

                // Here you can add code to send RSVP status to backend
                // For now, we'll just show a confirmation message
                const eventCard = this.closest('.event-card') || this.closest('.featured-event');
                const eventTitle = eventCard.querySelector('h3').textContent;
                
                // Show confirmation message
                const confirmationMessage = document.createElement('div');
                confirmationMessage.className = 'rsvp-confirmation';
                confirmationMessage.textContent = 'You\'re going to ' + eventTitle;
                confirmationMessage.style.cssText = `
                    color: var(--primary-color);
                    font-size: 0.9rem;
                    margin-top: 0.5rem;
                    text-align: center;
                `;
                
                this.parentNode.appendChild(confirmationMessage);
                
                // Remove confirmation message after 3 seconds
                setTimeout(() => {
                    confirmationMessage.remove();
                }, 3000);
            }
        });
    });
});
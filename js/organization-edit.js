// Function to make elements editable
function makeEditable(element) {
    const currentText = element.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'editable-input';
    
    // Save the original content
    const originalContent = element.innerHTML;
    
    // Replace the element content with input
    element.innerHTML = '';
    element.appendChild(input);
    input.focus();
    
    // Handle save on enter key
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit(element, input, originalContent);
        }
    });
    
    // Handle save on blur
    input.addEventListener('blur', function() {
        saveEdit(element, input, originalContent);
    });
}

// Function to save edits
function saveEdit(element, input, originalContent) {
    const newValue = input.value.trim();
    
    if (newValue) {
        // Here you would typically make an API call to save the changes
        // For now, we'll just update the UI
        const icon = originalContent.match(/<i.*?<\/i>/)?.[0] || '';
        element.innerHTML = icon + ' ' + newValue;
        
        // Show success message
        showNotification('Changes saved successfully!', 'success');
    } else {
        // If empty, revert to original
        element.innerHTML = originalContent;
        showNotification('Changes discarded - value cannot be empty', 'error');
    }
}

// Function to handle image editing
function editImage(type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                let img;
                if (type === 'logo') {
                    img = document.querySelector('.org-logo img');
                } else if (type === 'cover') {
                    img = document.querySelector('.org-cover-photo img');
                } else if (type === 'profile') {
                    img = document.querySelector('.profile-avatar img');
                }
                
                if (img) {
                    img.src = event.target.result;
                    showNotification('Image updated successfully!', 'success');
                } else {
                    showNotification('Error: Could not find image element', 'error');
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// Function to make tags editable
function makeEditableTags() {
    const tagsContainer = document.querySelector('.interest-tags');
    const originalTags = Array.from(tagsContainer.querySelectorAll('.interest-tag')).map(tag => tag.textContent);
    const tagsSection = document.getElementById('tagsSection');
    
    // Create the editable interface
    const editableContainer = document.createElement('div');
    editableContainer.className = 'editable-tags-container';
    
    // Create input for new tags
    const input = document.getElementById('tagInput');
    
    // Create tags display area
    const tagsDisplay = document.createElement('div');
    tagsDisplay.className = 'tags-display';
    
    // Function to render tags
    function renderTags(tags) {
        tagsDisplay.innerHTML = '';
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'interest-tag';
            tagElement.innerHTML = `${tag} <i class="fas fa-times remove-tag"></i>`;
            
            // Add remove functionality
            tagElement.querySelector('.remove-tag').addEventListener('click', () => {
                const index = tags.indexOf(tag);
                if (index > -1) {
                    tags.splice(index, 1);
                    renderTags(tags);
                }
            });
            
            tagsDisplay.appendChild(tagElement);
        });
    }
    
    // Initial render
    renderTags(originalTags);
    
    // Add new tag functionality
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newTag = input.value.trim();
            if (newTag && !originalTags.includes(newTag)) {
                originalTags.push(newTag);
                //renderTags(originalTags);
                input.value = '';
                // Update the tags container with the new tag
                const tagElement = document.createElement('span');
                tagElement.className = 'interest-tag';
                tagElement.textContent = newTag;
                tagsContainer.appendChild(tagElement);
                showNotification('Tag added successfully!', 'success');
            } else if (originalTags.includes(newTag)) {
                showNotification('Tag already exists!', 'error');
            }
        }
    });
    
    // Handle clicks outside the tags container
    function handleOutsideClick(event) {
        if (!tagsSection.contains(event.target)) {
            document.removeEventListener('click', handleOutsideClick);
            // Restore original tags if needed
            if (tagsContainer.contains(editableContainer)) {
                tagsContainer.innerHTML = '';
                originalTags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'interest-tag';
                    tagElement.textContent = tag;
                    tagsContainer.appendChild(tagElement);
                });
                input.classList.remove('active');
            }
        }
    }
    
    // Replace original content and add outside click listener
    tagsContainer.innerHTML = '';
    editableContainer.appendChild(tagsDisplay);
    input.classList.add('active');
    tagsContainer.appendChild(editableContainer);
    
    // Add click listener with a small delay to prevent immediate triggering
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 0);
}

// Function to show notifications
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
    }
    
    .notification.success {
        background-color: #4CAF50;
    }
    
    .notification.error {
        background-color: #f44336;
    }
    
    .editable-input {
        width: 100%;
        padding: 5px;
        font-size: inherit;
        font-family: inherit;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .editable-tags-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }

    .tags-display {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .tag-input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        width: 100%;
    }

    .interest-tag {
        background-color: #e1f5fe;
        color: #0288d1;
        padding: 5px 10px;
        border-radius: 15px;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
    }

    .remove-tag {
        cursor: pointer;
        color: #0288d1;
        opacity: 0.7;
        transition: opacity 0.2s;
    }

    .remove-tag:hover {
        opacity: 1;
    }
`;

document.head.appendChild(style);
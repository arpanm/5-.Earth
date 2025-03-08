// Modal Control Functions
function openOrgRegistration() {
    document.getElementById('orgRegistrationModal').classList.add('active');
}

function closeOrgRegistration() {
    document.getElementById('orgRegistrationModal').classList.remove('active');
    resetForm();
}

// Form Reset Function
function resetForm() {
    document.getElementById('orgRegistrationForm').reset();
    clearErrors();
}

// Clear Error Messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

// Form Validation
function validateForm(formData) {
    let isValid = true;
    clearErrors();

    // Organization Name Validation
    if (formData.orgName.length < 2) {
        showError('orgNameError', 'Organization name must be at least 2 characters long');
        isValid = false;
    }

    // Description Validation
    if (formData.orgDescription.length < 50) {
        showError('orgDescriptionError', 'Please provide a detailed description (at least 50 characters)');
        isValid = false;
    }

    // Category Validation
    if (!formData.orgCategory) {
        showError('orgCategoryError', 'Please select a category');
        isValid = false;
    }

    // Email Validation
    if (!formData.orgEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError('orgEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Website Validation (if provided)
    if (formData.orgWebsite && !formData.orgWebsite.match(/^https?:\/\/.+/)) {
        showError('orgWebsiteError', 'Please enter a valid website URL starting with http:// or https://');
        isValid = false;
    }

    // Phone Validation (if provided)
    if (formData.orgPhone && !formData.orgPhone.match(/^\+?[\d\s-()]{10,}$/)) {
        showError('orgPhoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    // Logo Validation
    const logoFile = document.getElementById('orgLogo').files[0];
    if (!logoFile) {
        showError('orgLogoError', 'Please upload an organization logo');
        isValid = false;
    } else if (!logoFile.type.match(/^image\//)) {
        showError('orgLogoError', 'Please upload a valid image file');
        isValid = false;
    }

    return isValid;
}

// Show Error Message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        console.warn(`Error element with id '${elementId}' not found`);
    }
}

// Handle Form Submission
async function handleOrgRegistration(event) {
    event.preventDefault();

    const form = event.target;
    const formData = {
        orgName: form.orgName.value.trim(),
        orgDescription: form.querySelector('[name="orgDescription"]')?.value.trim() || '',
        orgCategory: form.querySelector('[name="orgCategory"]')?.value || '',
        orgWebsite: form.orgWebsite.value.trim(),
        orgEmail: form.querySelector('[name="orgEmail"]')?.value.trim() || '',
        orgPhone: form.querySelector('[name="orgPhone"]')?.value.trim() || '',
        adminEmails: Array.from(form.querySelectorAll('[name="adminEmails[]"]')).map(input => input.value.trim())
    };

    if (!validateForm(formData)) {
        return;
    }

    // Disable submit button and show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';

    try {
        // Here you would typically send the data to your backend
        // For now, we'll simulate an API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Registration successful! Welcome to 5%.Earth';
        form.appendChild(successMessage);

        // Close modal and reset form after a delay
        setTimeout(() => {
            closeOrgRegistration();
            successMessage.remove();
        }, 2000);

    } catch (error) {
        console.error('Registration error:', error);
        showError('submitError', 'An error occurred during registration. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Register Organization';
    }
}

// File Upload Preview (if needed)
function handleFileUpload(input, previewElement) {
    const file = input.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewElement.src = e.target.result;
            previewElement.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Admin Row Management
function addAdminRow() {
    const container = document.getElementById('adminUsersContainer');
    const newRow = document.createElement('div');
    newRow.className = 'admin-user-row';
    newRow.innerHTML = `
        <input type="email" name="adminEmails[]" placeholder="Admin Email" class="admin-email">
        <button type="button" class="remove-admin" onclick="removeAdminRow(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(newRow);
}

function removeAdminRow(button) {
    const row = button.closest('.admin-user-row');
    if (document.querySelectorAll('.admin-user-row').length > 1) {
        row.remove();
    }
}

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Close modal when clicking outside
    document.getElementById('orgRegistrationModal').addEventListener('click', (e) => {
        if (e.target.id === 'orgRegistrationModal') {
            closeOrgRegistration();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('orgRegistrationModal').classList.contains('active')) {
            closeOrgRegistration();
        }
    });
});
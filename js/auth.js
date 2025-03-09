// Check if user is authenticated
function isAuthenticated() {
    const session = localStorage.getItem('userSession');
    return session !== null;
}

// Protect routes that require authentication
function protectRoute() {
    const protectedPages = ['community.html', 'myprofile.html', 'myorganization.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !isAuthenticated()) {
        // Store the current page URL to redirect back after login
        const currentUrl = window.location.href;
        const loginUrl = `login.html?redirect=${encodeURIComponent(currentPage)}`;
        window.location.href = loginUrl;
    }
}

// Initialize protection on page load
window.addEventListener('load', protectRoute);
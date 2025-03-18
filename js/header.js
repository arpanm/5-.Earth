document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Search toggle functionality
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');

    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchContainer.classList.toggle('active');
        searchToggle.classList.toggle('active');
    });

    // Profile dropdown
    const profileDropdown = document.querySelector('.profile-dropdown');
    const dropdownContent = document.querySelector('.profile-dropdown-content');

    profileDropdown.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownContent.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileDropdown.contains(e.target)) {
            dropdownContent.classList.remove('show');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchToggle.contains(e.target) && !searchContainer.contains(e.target)) {
            searchContainer.classList.remove('active');
            searchToggle.classList.remove('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');

    if (searchToggle && searchContainer) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                document.getElementById('global-search').focus();
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchToggle.contains(e.target) && 
                !searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }
});
// Blog form handling functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all post type buttons and post editors
    const postTypeBtns = document.querySelectorAll('.post-type-btn');
    const postEditors = document.querySelectorAll('.post-editor');

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
            }
        });
    });

    // Handle blog post submission
    const blogPostBtn = document.getElementById('blog-post-btn');
    if (blogPostBtn) {
        blogPostBtn.addEventListener('click', handleBlogPost);
    }
});

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

    // Create blog post object
    const blogPost = {
        type: 'blog',
        title: title,
        category: category,
        content: content,
        author: currentUser.name,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: []
    };

    // Add blog post to feed
    addPostToFeed(blogPost);

    // Clear form
    titleInput.value = '';
    categorySelect.value = '';
    contentTextarea.value = '';

    // Switch back to quick post form
    document.querySelector('.post-type-btn[data-type="quick-post"]').click();
}

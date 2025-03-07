document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            }
        });

        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.getAttribute('id') === tabId) {
                content.classList.add('active');
            }
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Set default active tab
    if (tabBtns.length > 0) {
        const defaultTabId = tabBtns[0].getAttribute('data-tab');
        switchTab(defaultTabId);
    }
});
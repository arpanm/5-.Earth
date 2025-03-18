const mockGoals = [
    {
        id: 1,
        title: "Reduce Water Consumption",
        type: "water",
        focusArea: "individual",
        timeline: "short",
        validation: "self",
        description: "Reduce household water consumption by 20% through efficient practices and fixtures",
        progress: 65,
        participants: 128,
        startDate: "2023-09-01",
        endDate: "2023-12-31"
    },
    {
        id: 2,
        title: "Solar Panel Installation",
        type: "energy",
        focusArea: "organization",
        timeline: "medium",
        validation: "expert",
        description: "Install solar panels to generate 50% of energy needs from renewable sources",
        progress: 30,
        participants: 45,
        startDate: "2023-08-15",
        endDate: "2024-08-15"
    },
    {
        id: 3,
        title: "Zero Waste Challenge",
        type: "waste",
        focusArea: "community",
        timeline: "long",
        validation: "crowd",
        description: "Achieve zero waste status by implementing comprehensive recycling and composting programs",
        progress: 85,
        participants: 312,
        startDate: "2023-01-01",
        endDate: "2023-12-31"
    },
    {
        id: 4,
        title: "Green Transportation Initiative",
        type: "energy",
        focusArea: "organization",
        timeline: "medium",
        validation: "ai",
        description: "Convert 75% of company fleet to electric vehicles",
        progress: 40,
        participants: 89,
        startDate: "2023-07-01",
        endDate: "2024-06-30"
    }
];

// Modal functionality
const modal = document.getElementById('createGoalModal');
const createGoalBtn = document.getElementById('createGoalBtn');
const closeBtn = document.querySelector('.close-btn');

createGoalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Populate goals grid
function createGoalCard(goal, mygoal=false) {
    return `
        <div class="goal-card" data-goalType="${goal.type}" data-focusArea="${goal.focusArea}" data-timeline="${goal.timeline}" data-validation="${goal.validation}" onclick="window.location.href='goal-detail.html?id=${goal.id}'">
            <div class="goal-header">
                <h3 class="goal-title">${goal.title}</h3>
                <div class="goal-meta">
                    <span><i class="fas fa-tag"></i> ${goal.type}</span>
                    <span><i class="fas fa-users"></i> ${goal.participants}</span>
                </div>
            </div>
            <div class="goal-content">
                <p class="goal-description">${goal.description}</p>
                <div class="goal-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${goal.progress}%"></div>
                    </div>
                    <span>${goal.progress}% Complete</span>
                </div>
                <div class="goal-actions">
                    ${!mygoal ? 
                        `<button class="action-btn"><i class="fas fa-hand-holding-heart"></i> Support</button>` 
                        : `<button class="progress-action-btn">Update Progress</button>` }
                    <button class="action-btn">Share</button>
                </div>
            </div>
        </div>
    `;
}

function populateGoals() {
    const allGoalsGrid = document.querySelector('#all-goals .goals-grid');
    const myGoalsGrid = document.querySelector('#my-goals .goals-grid');

    // Populate all goals
    allGoalsGrid.innerHTML = mockGoals.map(goal => createGoalCard(goal)).join('');

    // Populate my goals (subset of all goals)
    const myGoals = mockGoals.slice(0, 2); // Just showing first 2 goals as user's goals
    myGoalsGrid.innerHTML = myGoals.map(goal => createGoalCard(goal, true)).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateGoals();
});

document.addEventListener('DOMContentLoaded', function() {
    const createGoalBtn = document.getElementById('createGoalBtn');
    const createGoalModal = document.getElementById('createGoalModal');
    const closeBtn = document.querySelector('.close-btn');
    const createGoalForm = document.getElementById('createGoalForm');
    const goalCategory = document.getElementById('goalCategory');
    const dynamicFormFields = document.getElementById('dynamicFormFields');
    const filterSelects = document.querySelectorAll('.filter-options select');
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');

    // Modal functionality with proper z-index and display
    createGoalBtn.addEventListener('click', () => {
        createGoalModal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        createGoalModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === createGoalModal) {
            createGoalModal.classList.remove('active');
        }
    });

    // Filter functionality
    function filterGoals() {
        const goals = document.querySelectorAll('.goal-card');
        const searchTerm = searchInput.value.toLowerCase();
        const filters = {};

        filterSelects.forEach(select => {
            if (select.value) {
                filters[select.id] = select.value;
            }
        });

        goals.forEach(goal => {
            let matchesSearch = true;
            let matchesFilters = true;

            // Search term matching
            if (searchTerm) {
                const title = goal.querySelector('.goal-title').textContent.toLowerCase();
                const description = goal.querySelector('.goal-description').textContent.toLowerCase();
                matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            }

            // Filter matching
            Object.entries(filters).forEach(([filterKey, filterValue]) => {
                const goalValue = goal.getAttribute(`data-${filterKey}`);
                if (goalValue !== filterValue) {
                    matchesFilters = false;
                }
            });

            goal.style.display = matchesSearch && matchesFilters ? 'block' : 'none';
        });

        // Update empty state message
        const activeTab = document.querySelector('.tab-content.active');
        const visibleGoals = activeTab.querySelectorAll('.goal-card[style="display: block"]');
        const emptyMessage = activeTab.querySelector('.empty-goals-message') || createEmptyMessage();
        
        if (visibleGoals.length === 0) {
            if (!activeTab.contains(emptyMessage)) {
                activeTab.querySelector('.goals-grid').appendChild(emptyMessage);
            }
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }
    }

    function createEmptyMessage() {
        const message = document.createElement('div');
        message.className = 'empty-goals-message';
        message.style.cssText = 'text-align: center; padding: 2rem; color: #666; width: 100%;';
        message.textContent = 'No goals match your current filters. Try adjusting your search criteria.';
        return message;
    }

    // Add event listeners for filters and search
    filterSelects.forEach(select => {
        select.addEventListener('change', filterGoals);
    });

    searchInput.addEventListener('input', filterGoals);
    searchBtn.addEventListener('click', filterGoals);

    // Dynamic form fields based on goal category
    goalCategory.addEventListener('change', function() {
        const category = this.value;
        dynamicFormFields.innerHTML = '';
        // Add category-specific fields here
    });
});

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

// Goal type specific form field configurations
const goalTypeFields = {
    water: {
        fields: [
            {
                id: 'waterGoalType',
                label: 'Water Conservation Goal Type',
                type: 'select',
                options: [
                    'Reduce Water Usage',
                    'Rainwater Harvesting',
                    'Water Recycling',
                    'Fix Water Leaks',
                    'Smart Irrigation'
                ]
            },
            {
                id: 'waterQuantity',
                label: 'Target Quantity',
                type: 'number',
                placeholder: 'Enter target quantity'
            },
            {
                id: 'waterUnit',
                label: 'Unit of Measurement',
                type: 'select',
                options: ['Gallons', 'Liters', 'Cubic Meters', 'Percentage']
            }
        ]
    },
    energy: {
        fields: [
            {
                id: 'energyGoalType',
                label: 'Energy Efficiency Goal Type',
                type: 'select',
                options: [
                    'Reduce Energy Consumption',
                    'Switch to Renewable Energy',
                    'Install Energy Efficient Appliances',
                    'Smart Energy Management',
                    'Carbon Footprint Reduction'
                ]
            },
            {
                id: 'energyQuantity',
                label: 'Target Quantity',
                type: 'number',
                placeholder: 'Enter target quantity'
            },
            {
                id: 'energyUnit',
                label: 'Unit of Measurement',
                type: 'select',
                options: ['kWh', 'MWh', 'Percentage', 'Carbon Credits']
            }
        ]
    },
    waste: {
        fields: [
            {
                id: 'wasteGoalType',
                label: 'Waste Management Goal Type',
                type: 'select',
                options: [
                    'Reduce Waste Generation',
                    'Increase Recycling',
                    'Composting',
                    'Zero Waste Initiative',
                    'Plastic Reduction'
                ]
            },
            {
                id: 'wasteQuantity',
                label: 'Target Quantity',
                type: 'number',
                placeholder: 'Enter target quantity'
            },
            {
                id: 'wasteUnit',
                label: 'Unit of Measurement',
                type: 'select',
                options: ['Kilograms', 'Tons', 'Percentage', 'Items']
            }
        ]
    }
};

// Common fields for all goal types
const commonFields = [
    {
        id: 'goalTitle',
        label: 'Goal Title',
        type: 'text',
        placeholder: 'Enter a title for your goal'
    },
    {
        id: 'goalDescription',
        label: 'Goal Description',
        type: 'textarea',
        placeholder: 'Describe your goal in detail'
    },
    {
        id: 'timeline',
        label: 'Timeline',
        type: 'select',
        options: ['Short-term (1-3 months)', 'Medium-term (3-6 months)', 'Long-term (6+ months)']
    },
    {
        id: 'focusArea',
        label: 'Focus Area',
        type: 'select',
        options: ['Individual', 'Organization', 'Community']
    },
    {
        id: 'validationType',
        label: 'Validation Method',
        type: 'select',
        options: ['Self', 'Crowdsourced', 'AI-based', 'Expert Audit']
    },
    {
        id: 'visibility',
        label: 'Visibility',
        type: 'select',
        options: ['Public', 'Private', 'Community']
    }
];

// Function to create form field HTML
function createFormField(field) {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'form-group';

    const label = document.createElement('label');
    label.setAttribute('for', field.id);
    label.textContent = field.label;

    let input;
    if (field.type === 'select') {
        input = document.createElement('select');
        input.id = field.id;
        field.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.toLowerCase().replace(/ /g, '-');
            optionElement.textContent = option;
            input.appendChild(optionElement);
        });
    } else if (field.type === 'textarea') {
        input = document.createElement('textarea');
        input.id = field.id;
        input.placeholder = field.placeholder;
    } else {
        input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.placeholder = field.placeholder;
    }

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    return fieldContainer;
}

// Function to update form fields based on goal category
function updateFormFields(category) {
    const dynamicFormFields = document.getElementById('dynamicFormFields');
    dynamicFormFields.innerHTML = '';

    // Add category-specific fields
    if (category && goalTypeFields[category]) {
        goalTypeFields[category].fields.forEach(field => {
            dynamicFormFields.appendChild(createFormField(field));
        });
    }

    // Add common fields
    commonFields.forEach(field => {
        dynamicFormFields.appendChild(createFormField(field));
    });
}

// Initialize form field population
document.addEventListener('DOMContentLoaded', () => {
    const goalCategory = document.getElementById('goalCategory');
    if (goalCategory) {
        goalCategory.addEventListener('change', (e) => {
            updateFormFields(e.target.value);
        });
    }
});
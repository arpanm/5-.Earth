document.addEventListener('DOMContentLoaded', function() {
    const addOptionBtn = document.querySelector('.add-option-btn');
    const pollOptionsContainer = document.querySelector('.poll-options-container');

    if (addOptionBtn && pollOptionsContainer) {
        addOptionBtn.addEventListener('click', function() {
            const optionCount = pollOptionsContainer.children.length + 1;
            
            const newOptionDiv = document.createElement('div');
            newOptionDiv.className = 'poll-option-input';
            
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = `Option ${optionCount}`;
            newInput.className = 'poll-option';
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-option-btn';
            removeBtn.title = 'Remove Option';
            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
            
            removeBtn.addEventListener('click', function() {
                newOptionDiv.remove();
                updateOptionPlaceholders();
            });
            
            newOptionDiv.appendChild(newInput);
            newOptionDiv.appendChild(removeBtn);
            pollOptionsContainer.appendChild(newOptionDiv);
        });

        function updateOptionPlaceholders() {
            const options = pollOptionsContainer.querySelectorAll('.poll-option');
            options.forEach((option, index) => {
                option.placeholder = `Option ${index + 1}`;
            });
        }
    }
});
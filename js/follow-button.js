document.addEventListener('DOMContentLoaded', () => {
    const followButtons = document.querySelectorAll('.follow-btn');

    followButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isFollowing = button.classList.contains('following');
            let objId = "123";
            let objType = "user";
            if (button.getAttributeNode('data')){
                const data = button.getAttributeNode('data').value;
                const dataVal = data.split(':');
                objType = dataVal[0];
                objId = dataVal[1];
            }
            
            if (isFollowing) {
                button.classList.remove('following');
                button.innerHTML = `
                    <i class="fas ${objType == "user" ? 'fa-user-plus' : 'fa-building'}"></i> <span class="follow-text">Follow</span>
                `;
            } else {
                button.classList.add('following');
                button.innerHTML = `
                    <i class="fas ${objType == "user" ? 'fa-user-check' : 'fa-building'}"></i>
                    <span class="follow-text">Following</span>
                    <span class="unfollow-text">Unfollow</span>
                `;
            }

            // Here you can add API call to update follow status in backend
            // updateFollowStatus(userId, isFollowing);
        });
    });
});
// Sample user credentials (replace with backend authentication)
const users = [
    { username: 'user1', password: 'password123' },
    { username: 'user2', password: 'password456' }
];

// Session management functions
function setSession(userData) {
    localStorage.setItem('userSession', JSON.stringify(userData));
    loginSuccess(userData.username);
}

function getSession() {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
}

function clearSession() {
    localStorage.removeItem('userSession');
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const otp = document.getElementById('otp').value;

    try {
        // Simulated API call - replace with actual authentication API
        const response = await simulateAuth(username, password, otp);
        if (response.success) {
        
            setSession(response.userData);
            // Get the redirect URL from query parameters or default to index
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect') || 'index.html';
            window.location.href = redirectUrl;
        } else {
            document.getElementById('loginError').classList.remove('d-none');
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('loginError').classList.remove('d-none');
    }
}

// Simulate authentication API call
async function simulateAuth(username, password, otp) {
    // Replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => {
            if ((username === 'user1' && password === 'password123')
                || ( username === 'user2' && password === 'password456')
                || (username === 'user1' && otp === '123456')
                || (username === 'user2' && otp === '123456')) {
                resolve({
                    success: true,
                    userData: {
                        username,
                        name: 'Test User',
                        email: `${username}@example.com`
                    }
                });
            } else {
                resolve({ success: false });
            }
        }, 1000);
    });
}

// Handle OTP login toggle
function toggleOTPLogin(event) {
    event.preventDefault();
    const passwordDiv = document.getElementById('passwordDiv');
    const otpSection = document.getElementById('otpSection');
    const otpInputSection = document.getElementById('otpInputSection');
    const otpBtnText = document.getElementById('otpBtnText');

    if (passwordDiv.classList.contains('d-none')) {
        passwordDiv.classList.remove('d-none');
        otpSection.classList.add('d-none');
        otpInputSection.classList.add('d-none');
        otpBtnText.textContent = 'Login with OTP';
    } else {
        passwordDiv.classList.add('d-none');
        otpSection.classList.remove('d-none');
        otpInputSection.classList.remove('d-none');
        otpBtnText.textContent = 'Login with Password';
    }
}

// Request OTP (simulated)
function requestOTP() {
    const username = document.getElementById('username').value;
    const otpInputSection = document.getElementById('otpInputSection');

    if (username === 'user1' || username === 'user2') {
        // Simulate OTP sending (in production, this would make an API call)
        console.log('Sending OTP to user:', username);
        otpInputSection.classList.remove('d-none');
    } else {
        alert('Invalid username. Please enter a valid username.');
    }
}

// Handle successful login
function loginSuccess(username) {
    // Store login state
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);

    // Redirect to originally requested page or default to index
    const redirectUrl = sessionStorage.getItem('redirectUrl') || 'index.html';
    sessionStorage.removeItem('redirectUrl');
    window.location.href = redirectUrl;
}

// Show login error
function showLoginError() {
    const loginError = document.getElementById('loginError');
    loginError.classList.remove('d-none');
    setTimeout(() => {
        loginError.classList.add('d-none');
    }, 3000);
}

// Check login status when accessing any page
function checkLoginStatus() {
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['community.html', 'myprofile.html', 'myorganization.html'];
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    // If accessing a protected page without being logged in
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        sessionStorage.setItem('redirectUrl', currentPage);
        const currentUrl = window.location.href;
        const loginUrl = `login.html?redirect=${encodeURIComponent(currentPage)}`;
        window.location.href = loginUrl;
    }

    // If logged in and on login page, redirect to index
    if (isLoggedIn && currentPage === 'login.html') {
        window.location.href = 'index.html';
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Check login status when page loads
window.addEventListener('load', checkLoginStatus);
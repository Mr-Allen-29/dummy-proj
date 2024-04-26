const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const but = document.querySelector('.but');
const loginForm = document.querySelector('.login form'); // Select the login form

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

but.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Add event listener to login form submit event
loginForm.addEventListener('submit', handleLogin);

async function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic form validation (check if email and password are empty)
    if (!email || !password) {
        alert('Please enter your email and password.');
        return;  // Exit the function if validation fails
    }

    const loginData = { email, password };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (data.message === 'Login successful') {
            console.log('Login successful!');
            // Store JWT token (if received) and proceed to exam list or other functionalities
        } else {
            console.error('Login error:', data.message);
            // Display error message to user (e.g., alert)
        }
    } catch (err) {
        console.error('Error during login:', err);
        // Handle network errors (e.g., alert user)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- UI Switcher Logic ---
    const showLoginBtn = document.getElementById('show-login-btn');
    const showSignupBtn = document.getElementById('show-signup-btn');
    const loginFormContainer = document.getElementById('login-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');

    const switchForm = (showLogin) => {
        if (showLogin) {
            loginFormContainer.classList.add('active-form');
            loginFormContainer.classList.remove('hidden-form');
            signupFormContainer.classList.add('hidden-form');
            signupFormContainer.classList.remove('active-form');
            showLoginBtn.classList.add('active');
            showSignupBtn.classList.remove('active');
        } else {
            signupFormContainer.classList.add('active-form');
            signupFormContainer.classList.remove('hidden-form');
            loginFormContainer.classList.add('hidden-form');
            loginFormContainer.classList.remove('active-form');
            showSignupBtn.classList.add('active');
            showLoginBtn.classList.remove('active');
        }
    };

    showLoginBtn.addEventListener('click', () => switchForm(true));
    showSignupBtn.addEventListener('click', () => switchForm(false));

    // --- Form Submission Logic (Demonstration Only) ---
    
    // Login Handler
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const message = document.getElementById('login-message');

        if (email && password) {
            // Simulate successful login (No actual verification done)
            message.textContent = `Success! Logged in as ${email}. Redirecting to shop...`;
            message.style.color = '#4CAF50';
            
            // Fix applied here: Redirect to shop.html
            setTimeout(() => {
                window.location.href = 'shop.html'; 
            }, 1000);
            
            this.reset(); // Clear the form
        } else {
            message.textContent = 'Please enter both email and password.';
            message.style.color = 'red';
        }
    });

    // Sign Up Handler
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const message = document.getElementById('signup-message');

        if (name && email && password) {
            // Simulate successful sign up (No actual account creation)
            message.textContent = `Success! Account created for ${name}. Please log in.`;
            message.style.color = '#4CAF50';
            this.reset(); // Clear the form
            
            // Automatically switch back to the login form after a delay
            setTimeout(() => {
                switchForm(true);
                document.getElementById('login-email').value = email; // Pre-fill email
            }, 1500);
        } else {
            message.textContent = 'Please fill in all fields.';
            message.style.color = 'red';
        }
    });
});


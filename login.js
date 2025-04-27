const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      errorMessage.textContent = error.error
      errorMessage.style.display = 'block';
    } else {
        localStorage.setItem('email', email);
        window.location.href = 'home.html';
    }
  } catch (err) {
    errorMessage.textContent = 'An error occurred. Please try again.';
    errorMessage.style.display = 'block';
  }
});
function redirectToRegister() {
    window.location.href = 'register.html';
  }
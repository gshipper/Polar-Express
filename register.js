const registerForm = document.getElementById("registerForm");
const errorMessage = document.getElementById("errorMessage");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match.";
    errorMessage.style.display = "block";
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, first_name, last_name, password }),
    });

    if (response.ok) {
      window.location.href = "index.html";
    } else {
      const error = await response.json();
      errorMessage.textContent = error.error;
      errorMessage.style.display = "block";
    }
  } catch (err) {
    errorMessage.textContent = "An error occurred. Please try again.";
    errorMessage.style.display = "block";
  }
});

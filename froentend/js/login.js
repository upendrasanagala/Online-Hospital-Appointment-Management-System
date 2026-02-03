const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (email.value === "admin@gmail.com" && password.value === "admin123") {
    localStorage.setItem("admin", "true");
    window.location.href = "admin.html";
  } else {
    alert(" Invalid Admin Credentials");
  }
});

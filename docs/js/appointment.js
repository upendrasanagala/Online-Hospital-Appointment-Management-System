document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const errorBox = document.getElementById("formError");

  if (!form) {
    console.error(" Form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset error
    errorBox.style.display = "none";
    errorBox.textContent = "";

    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      dob: document.getElementById("dob").value,
      bloodGroup: document.getElementById("bloodGroup").value,
      appointmentDate: document.getElementById("appointmentDate").value,
      department: document.getElementById("department").value,
      symptoms: document.getElementById("symptoms").value.trim()
    };

    /* ========= FRONTEND VALIDATIONS ========= */

    if (!data.name || !data.email || !data.phone || !data.department || !data.appointmentDate) {
      showError("Please fill all required fields");
      return;
    }

    // 📞 Phone validation (India)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
      showError("Please enter a valid 10-digit mobile number");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showError("Please enter a valid email address");
      return;
    }

    // Date validation
    if (new Date(data.appointmentDate) < new Date().setHours(0, 0, 0, 0)) {
      showError("Appointment date cannot be in the past");
      return;
    }

    /* ========= SUBMIT ========= */

    submitBtn.disabled = true;
    submitBtn.classList.add("loading");
    btnText.textContent = "Booking...";

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Failed");

      submitBtn.classList.remove("loading");
      submitBtn.classList.add("success");
      btnText.textContent = "Booked ✔";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1200);

    } catch (err) {
      console.error(" API Error:", err);
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
      btnText.textContent = "Confirm Booking";
      showError("Server not reachable. Please try again.");
    }
  });

  function showError(message) {
    errorBox.textContent = message;
    errorBox.style.display = "block";
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    btnText.textContent = "Confirm Booking";
  }
});

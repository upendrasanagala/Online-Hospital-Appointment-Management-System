//  Protect admin page
if (!localStorage.getItem("admin")) {
  window.location.href = "login.html";
}

//  Load appointments on page load
document.addEventListener("DOMContentLoaded", loadAppointments);

function loadAppointments() {
  fetch("http://localhost:5000/api/appointments/all")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch appointments");
      }
      return res.json();
    })
    .then(data => {
      console.log("Admin appointments:", data);

      const totalAppointments = document.getElementById("totalAppointments");
      if (totalAppointments) totalAppointments.textContent = data.length;

      const appointments = document.getElementById("appointments");
      appointments.innerHTML = "";

      if (data.length === 0) {
        appointments.innerHTML = `
          <tr>
            <td colspan="5" style="text-align:center; color:#64748b;">
              No appointments found
            </td>
          </tr>
        `;
        return;
      }

      data.forEach(a => {
        let statusClass = "status-pending";
        if (a.status === "confirmed") statusClass = "status-confirmed";
        if (a.status === "cancelled") statusClass = "status-cancelled";

        // Only show action buttons if status is "pending"
        const isPending = a.status === "pending";

        appointments.innerHTML += `
          <tr>
            <td>
              <div class="patient-name">${a.name}</div>
              <div class="patient-email">${a.email}</div>
            </td>

            <td>${new Date(a.appointmentDate).toLocaleDateString()}</td>

            <td class="description-cell">
              ${a.symptoms ? a.symptoms : "<span class='muted'>No description</span>"}
            </td>

            <td>
              <span class="status-badge ${statusClass}">
                ${a.status}
              </span>
            </td>

            <td class="actions">
              ${isPending ? `
                <button class="action-btn btn-confirm" id="confirm-${a.id}"
                  onclick="updateStatus(${a.id}, 'confirmed', this)">✓</button>
                <button class="action-btn btn-cancel" id="cancel-${a.id}"
                  onclick="updateStatus(${a.id}, 'cancelled', this)">✕</button>
              ` : `
                <span class="muted" style="font-size:0.85rem;">—</span>
              `}
            </td>
          </tr>
        `;
      });
    })
    .catch(err => {
      console.error("❌ Admin fetch error:", err);
      alert("Failed to load appointments");
    });
}

//  Update appointment status
function updateStatus(id, status, btnElement) {
  // Immediately disable both buttons in the row to prevent double-click
  if (btnElement) {
    const row = btnElement.closest('tr');
    const buttons = row.querySelectorAll('.action-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
    });
  }

  fetch(`http://localhost:5000/api/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      return res.json();
    })
    .then(() => {
      loadAppointments(); // refresh table
    })
    .catch(err => {
      console.error("❌ Status update error:", err);
      alert("Could not update status");
      // Re-enable buttons on error
      if (btnElement) {
        const row = btnElement.closest('tr');
        const buttons = row.querySelectorAll('.action-btn');
        buttons.forEach(btn => {
          btn.disabled = false;
          btn.style.opacity = '1';
          btn.style.cursor = 'pointer';
        });
      }
    });
}

//  Logout
function logout() {
  localStorage.removeItem("admin");
  window.location.href = "home.html";
}

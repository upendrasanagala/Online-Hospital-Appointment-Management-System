async function checkStatus() {
  const emailInput = email.value.trim();

  if (!emailInput) {
    result.innerHTML = `<p class="status-empty">Please enter your email address.</p>`;
    return;
  }

  result.innerHTML = `<p class="status-empty">Checking your appointment history…</p>`;

  try {
    const res = await fetch(
      `http://localhost:5000/api/appointments?email=${encodeURIComponent(emailInput)}`,
      {
        headers: {
          "X-Client-Key": "CITY_HOSPITAL_WEB"
        }
      }
    );

    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    if (!data || data.length === 0) {
      result.innerHTML = `<p class="status-empty">No appointments found.</p>`;
      return;
    }

    result.innerHTML = data.map(a => {
      const statusClass = `status-${a.status}`;
      const icon = getStatusIcon(a.status);

      return `
        <div class="history-card">
          <p>
            <b>Status:</b>
            <span class="status-pill ${statusClass}">
              ${icon} ${a.status}
            </span>
          </p>
          <p><b>Date:</b> ${a.appointmentDate}</p>
        </div>
      `;
    }).join("");

  } catch (err) {
    result.innerHTML = `
      <p class="status-empty">
        Unable to fetch records. Please try again later.
      </p>
    `;
  }
}

/* Status icon helper */
function getStatusIcon(status) {
  if (status === "confirmed") return "✅";
  if (status === "cancelled") return "❌";
  return "⏳";
}

import nodemailer from "nodemailer";

export const sendAppointmentConfirmation = async (
  to: string,
  name: string,
  date: string,
  department: string,
  symptoms?: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"City Hospital" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Appointment Confirmation – City Hospital",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color:#0f172a">
        <h2 style="color:#2563eb; margin-bottom:10px;">
          Appointment Booked Successfully
        </h2>

        <p>Hello <b>${name}</b>,</p>

        <p>Your appointment has been successfully booked. Below are the details:</p>

        <table style="border-collapse:collapse; margin-top:10px">
          <tr>
            <td style="padding:6px 0"><b>Date</b></td>
            <td style="padding:6px 0">: ${date}</td>
          </tr>
          <tr>
            <td style="padding:6px 0"><b>Department</b></td>
            <td style="padding:6px 0">: ${department}</td>
          </tr>
          <tr>
            <td style="padding:6px 0"><b>Description</b></td>
            <td style="padding:6px 0">
              : ${symptoms ? symptoms : "Not provided"}
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0"><b>Status</b></td>
            <td style="padding:6px 0">: Pending</td>
          </tr>
        </table>

        <p style="margin-top:20px; color:#334155">
          We will notify you once the appointment is confirmed.
        </p>

        <p style="margin-top:20px">
          — <b>City Hospital</b>
        </p>
      </div>
    `
  });
};


export const sendAppointmentConfirmedEmail = async (
  to: string,
  name: string,
  date: string,
  department: string,
  symptoms?: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"City Hospital" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Appointment Confirmed – City Hospital",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2 style="color:#16a34a">Appointment Confirmed ✅</h2>

        <p>Hello <b>${name}</b>,</p>

        <p>Your appointment has been <b>confirmed</b>. Please find the details below:</p>

        <table style="border-collapse:collapse">
          <tr>
            <td><b>Date</b></td>
            <td>: ${date}</td>
          </tr>
          <tr>
            <td><b>Department</b></td>
            <td>: ${department}</td>
          </tr>
          <tr>
            <td><b>Description</b></td>
            <td>: ${symptoms || "Not provided"}</td>
          </tr>
          <tr>
            <td><b>Status</b></td>
            <td>: Confirmed</td>
          </tr>
        </table>

        <p style="margin-top:20px">
          Please arrive 10 minutes early.
        </p>

        <p>— City Hospital</p>
      </div>
    `
  });
};


export const sendAppointmentCancelledEmail = async (
  to: string,
  name: string,
  date: string,
  department: string,
  symptoms?: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"City Hospital" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Appointment Update – City Hospital",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0f172a">
        <h2 style="color:#dc2626">Appointment Cancelled ❌</h2>

        <p>Hello <b>${name}</b>,</p>

        <p>
          We regret to inform you that your appointment has been
          <b>cancelled</b>.
        </p>

        <table style="border-collapse:collapse; margin-top:10px">
          <tr>
            <td><b>Date</b></td>
            <td>: ${date}</td>
          </tr>
          <tr>
            <td><b>Department</b></td>
            <td>: ${department}</td>
          </tr>
          <tr>
            <td><b>Description</b></td>
            <td>: ${symptoms || "Not provided"}</td>
          </tr>
          <tr>
            <td><b>Status</b></td>
            <td>: Cancelled</td>
          </tr>
        </table>

        <p style="margin-top:20px">
          You may book another appointment at your convenience.
        </p>

        <p>— City Hospital</p>
      </div>
    `
  });
};

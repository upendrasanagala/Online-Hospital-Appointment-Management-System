import { Request, Response } from "express";
import * as AppointmentService from "../service/appointmentService";
import {
  sendAppointmentConfirmation,
  sendAppointmentConfirmedEmail,
  sendAppointmentCancelledEmail
} from "../service/emailService";

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/* =========================
   CREATE APPOINTMENT
========================= */
export const createAppointment = (req: Request, res: Response) => {
  const {
    name,
    email,
    phone,
    department,
    appointmentDate,
    symptoms
  } = req.body;

  /* ========= VALIDATIONS ========= */

  if (!name || !email || !phone || !department || !appointmentDate) {
    return res.status(400).json({
      message: "All required fields must be filled"
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: "Invalid email address"
    });
  }

  const selectedDate = new Date(appointmentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return res.status(400).json({
      message: "Appointment date cannot be in the past"
    });
  }

  /* ========= SAVE ========= */

  AppointmentService.bookAppointment(req.body, async (err: any) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    try {
      await sendAppointmentConfirmation(
        email,
        name,
        appointmentDate,
        department,
        symptoms
      );
    } catch (e) {
      console.error("❌ Booking email failed", e);
    }

    res.json({ message: "Appointment booked successfully" });
  });
};

/* =========================
   USER – GET APPOINTMENTS BY EMAIL
========================= */
export const getAppointments = (req: Request, res: Response) => {
  const email = req.query.email as string;

  AppointmentService.fetchAppointments(email, (err: any, data: any) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

/* =========================
   ADMIN – GET ALL APPOINTMENTS
========================= */
export const getAllAppointments = (req: Request, res: Response) => {
  AppointmentService.fetchAllAppointments((err: any, data: any) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

/* =========================
   ADMIN – UPDATE STATUS
========================= */
export const updateAppointmentStatus = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  AppointmentService.changeStatus(id, status, (err: any) => {
    if (err) return res.status(500).json(err);

    // Send confirmation email
    if (status === "confirmed") {
      AppointmentService.fetchAppointmentById(id, (err: any, rows?: any[]) => {
        if (err || !rows || rows.length === 0) return;

        const appt = rows[0];

        try {
          sendAppointmentConfirmedEmail(
            appt.email,
            appt.name,
            appt.appointmentDate,
            appt.department,
            appt.symptoms
          ).catch((e) => {
            console.error("❌ Confirm email failed", e);
          });
        } catch (e) {
          console.error("❌ Confirm email failed", e);
        }
      });
    }

    // Send cancellation email
    if (status === "cancelled") {
      AppointmentService.fetchAppointmentById(id, (err: any, rows?: any[]) => {
        if (err || !rows || rows.length === 0) return;

        const appt = rows[0];

        try {
          sendAppointmentCancelledEmail(
            appt.email,
            appt.name,
            appt.appointmentDate,
            appt.department,
            appt.symptoms
          ).catch((e) => {
            console.error("❌ Cancellation email failed", e);
          });
        } catch (e) {
          console.error("❌ Cancellation email failed", e);
        }
      });
    }

    res.json({ message: "Status updated successfully" });
  });
};

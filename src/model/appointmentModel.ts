import db from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface Appointment {
  id?: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  appointmentDate: string;
  symptoms?: string;
  status?: string;
}


/* =========================
   CREATE APPOINTMENT
========================= */
export const createAppointment = (
  data: Appointment,
  callback: (err: any, result?: ResultSetHeader) => void
) => {
  const sql = `
    INSERT INTO appointments
    (name, email, phone, department, appointmentDate, symptoms)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.name,
    data.email,
    data.phone,
    data.department,
    data.appointmentDate,
    data.symptoms
  ];

  db.query(sql, values, callback);
};


/* =========================
   GET APPOINTMENTS BY EMAIL
========================= */
export const getAppointmentsByEmail = (
  email: string,
  callback: (err: any, rows?: RowDataPacket[]) => void
) => {
  const sql = `
    SELECT * FROM appointments
    WHERE email = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [email], (err, rows) => {
    callback(err, rows as RowDataPacket[]);
  });
};

/* =========================
   UPDATE STATUS
========================= */
export const updateAppointmentStatus = (
  id: number,
  status: string,
  callback: (err: any, result?: ResultSetHeader) => void
) => {
  const sql = `
    UPDATE appointments
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    callback(err, result as ResultSetHeader);
  });
};

//* get all appointments (for admin) *//
export const getAllAppointments = (
  callback: (err: any, rows?: any[]) => void
) => {
  const sql = `
    SELECT * FROM appointments
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, rows) => {
    callback(err, rows as any[]);
  });
};

export const getAppointmentById = (
  id: number,
  callback: (err: any, rows?: any[]) => void
) => {
  db.query(
    "SELECT * FROM appointments WHERE id = ?",
    [id],
    (err, rows) => {
      callback(err, rows as any[]);
    }
  );
};
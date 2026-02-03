import * as AppointmentModel from "../model/appointmentModel";
import { Appointment } from "../model/appointmentModel";
import { ResultSetHeader, RowDataPacket } from "mysql2";

/* =========================
   BOOK APPOINTMENT
========================= */
export const bookAppointment = (
  data: Appointment,
  callback: (err: any, result?: ResultSetHeader) => void
) => {
  AppointmentModel.createAppointment(data, callback);
};

/* =========================
   FETCH APPOINTMENTS
========================= */
export const fetchAppointments = (
  email: string,
  callback: (err: any, rows?: RowDataPacket[]) => void
) => {
  AppointmentModel.getAppointmentsByEmail(email, callback);
};

/* =========================
   UPDATE STATUS
========================= */
export const changeStatus = (
  id: number,
  status: string,
  callback: (err: any, result?: ResultSetHeader) => void
) => {
  AppointmentModel.updateAppointmentStatus(id, status, callback);
};

/* =========================
   FETCH ALL APPOINTMENTS (ADMIN)
========================= */
export const fetchAllAppointments = (
  callback: (err: any, rows?: RowDataPacket[]) => void
) => {
  AppointmentModel.getAllAppointments(callback);
};

export const fetchAppointmentById = (
  id: number,
  callback: (err: any, rows?: any[]) => void
) => {
  AppointmentModel.getAppointmentById(id, callback);
};

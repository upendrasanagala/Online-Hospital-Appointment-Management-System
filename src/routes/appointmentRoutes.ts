import express from "express";
import * as controller from "../controller/appointmentController";

const router = express.Router();

router.post("/", controller.createAppointment);
router.get("/", controller.getAppointments);
router.put("/:id", controller.updateAppointmentStatus);
router.get("/all", controller.getAllAppointments);


export default router;

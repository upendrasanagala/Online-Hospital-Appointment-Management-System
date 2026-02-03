import express from "express";
import cors from "cors";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/appointments", appointmentRoutes);

export default app;

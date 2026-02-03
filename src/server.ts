import app from "./app";
import db from "./config/db";
import { RowDataPacket } from "mysql2";

const PORT = 5000;

db.query("SELECT 1", (err, rows: RowDataPacket[]) => {
  if (err) {
    console.error(" Database connection failed ...", err);
  } else {
    console.log("Database connected successfully");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// to run the server: npm run dev
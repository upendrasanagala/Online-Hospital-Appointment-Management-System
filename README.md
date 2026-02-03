# Online-Hospital-Appointment-Management-System

An end-to-end web application designed to simplify hospital appointment booking, management, and tracking for patients and administrators.

📌 Features
👤 Patient

Book appointments with doctors by department

View appointment status

Simple and user-friendly interface

🧑‍⚕️ Admin

Manage departments and doctors

View and manage all appointments

Update appointment status

🛠️ Tech Stack
Frontend

HTML

CSS

JavaScript

Backend

Node.js

Express.js

TypeScript

Database

MySQL (Primary)

SQLite (Fallback for local testing)

Tools

Sequelize ORM

Git & GitHub

📂 Project Structure
Hospital project/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── html files
│   ├── css/
│   └── js/
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/upendrasanagala/Online-Hospital-Appointment-Management-System.git
cd Online-Hospital-Appointment-Management-System

2️⃣ Backend setup
cd backend
npm install


Create a .env file:

DB_NAME=your_db_name
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost
PORT=3000


Run the server:

npm run dev

3️⃣ Frontend setup

Open the frontend HTML files directly in your browser
(or use Live Server in VS Code).

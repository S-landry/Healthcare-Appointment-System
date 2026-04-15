const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mysql = require("mysql2/promise");
const sequelize = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: "hospital_session_secret_2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

const bootstrap = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
    });

    await connection.query("CREATE DATABASE IF NOT EXISTS hospital_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    await connection.end();

    await sequelize.sync({ alter: false });

    await User.findOrCreate({
        where: { email: "admin@hospital.com" },
        defaults: {
            name: "Admin",
            password: bcrypt.hashSync("admin123", 10),
            role: "admin",
            phone: ""
        }
    });

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
};

bootstrap().catch(error => console.error("Database connection failed:", error));

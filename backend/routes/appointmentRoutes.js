const express = require("express");
const { bookAppointment, getPatientAppointments, getDoctorAppointments, updateAppointmentStatus, cancelAppointment } = require("../controllers/appointmentController");
const { authMiddleware } = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/book", authMiddleware, roleMiddleware(["patient"]), bookAppointment);
router.get("/patient", authMiddleware, roleMiddleware(["patient"]), getPatientAppointments);
router.get("/doctor", authMiddleware, roleMiddleware(["doctor"]), getDoctorAppointments);
router.put("/:id/status", authMiddleware, roleMiddleware(["doctor", "admin"]), updateAppointmentStatus);
router.put("/:id/cancel", authMiddleware, roleMiddleware(["patient", "doctor", "admin"]), cancelAppointment);

module.exports = router;

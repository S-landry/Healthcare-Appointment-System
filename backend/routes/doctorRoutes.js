const express = require("express");
const { createDoctor, getAllDoctors, getDoctorById, updateDoctorProfile } = require("../controllers/doctorController");
const { authMiddleware } = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, roleMiddleware(["admin"]), createDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/profile", authMiddleware, roleMiddleware(["doctor"]), updateDoctorProfile);

module.exports = router;

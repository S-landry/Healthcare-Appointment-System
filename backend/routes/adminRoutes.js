const express = require("express");
const { getAllUsers, getAllAppointments, getStatistics, deleteUser } = require("../controllers/adminController");
const { authMiddleware } = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
router.get("/appointments", authMiddleware, roleMiddleware(["admin"]), getAllAppointments);
router.get("/statistics", authMiddleware, roleMiddleware(["admin"]), getStatistics);
router.delete("/users/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

module.exports = router;

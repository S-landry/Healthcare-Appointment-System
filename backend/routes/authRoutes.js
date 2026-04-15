const express = require("express");
const { patientRegister, login, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/register", patientRegister);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;

const express = require("express");
const { patientRegister, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", patientRegister);
router.post("/login", login);

module.exports = router;

const User = require("../models/User");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const { generateToken } = require("../middleware/auth");
const bcrypt = require("bcryptjs");

exports.patientRegister = async (req, res) => {
    try {
        const { name, email, password, phone, dob, gender, address } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ error: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, phone, role: "patient" });
        const patient = await Patient.create({ userId: user.id, dob, gender, address });

        const token = generateToken(user.id, user.role, user.email);
        res.status(201).json({ message: "Patient registered", token, user: { id: user.id, name, email, role: "patient" } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

        const token = generateToken(user.id, user.role, user.email);
        res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

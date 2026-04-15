const User = require("../models/User");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");

exports.createDoctor = async (req, res) => {
    try {
        const { name, email, password, phone, specialization } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ error: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, phone, role: "doctor" });
        const doctor = await Doctor.create({ userId: user.id, specialization });

        res.status(201).json({ message: "Doctor account created", doctor: { id: user.id, name, email, specialization } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({
            include: [{ model: User, attributes: ["id", "name", "email", "phone"] }],
            attributes: ["id", "specialization", "bio"]
        });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id, {
            include: [{ model: User, attributes: ["id", "name", "email", "phone"] }]
        });
        if (!doctor) return res.status(404).json({ error: "Doctor not found" });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDoctorProfile = async (req, res) => {
    try {
        const { specialization, bio, availability } = req.body;
        const doctor = await Doctor.findOne({ where: { userId: req.user.id } });

        if (!doctor) return res.status(404).json({ error: "Doctor profile not found" });

        await doctor.update({ specialization, bio, availability });
        res.json({ message: "Profile updated", doctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ["id", "name", "email", "role", "phone"] });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [
                {
                    model: Doctor,
                    include: [{ model: User, attributes: ["name"] }],
                    attributes: ["specialization"]
                },
                {
                    model: Patient,
                    include: [{ model: User, attributes: ["name"] }]
                }
            ]
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const patientCount = await User.count({ where: { role: "patient" } });
        const doctorCount = await User.count({ where: { role: "doctor" } });
        const appointmentCount = await Appointment.count();
        const completedCount = await Appointment.count({ where: { status: "completed" } });

        res.json({ patientCount, doctorCount, appointmentCount, completedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.destroy();
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

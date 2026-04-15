const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const User = require("../models/User");

exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, reason } = req.body;
        const patient = await Patient.findOne({ where: { userId: req.user.id } });

        if (!patient) return res.status(404).json({ error: "Patient profile not found" });

        const appointment = await Appointment.create({
            patientId: patient.id,
            doctorId,
            appointmentDate,
            reason
        });

        res.status(201).json({ message: "Appointment booked", appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPatientAppointments = async (req, res) => {
    try {
        const patient = await Patient.findOne({ where: { userId: req.user.id } });
        if (!patient) return res.status(404).json({ error: "Patient not found" });

        const appointments = await Appointment.findAll({
            where: { patientId: patient.id },
            include: [
                {
                    model: Doctor,
                    include: [{ model: User, attributes: ["name", "email", "phone"] }],
                    attributes: ["specialization"]
                }
            ]
        });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDoctorAppointments = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ where: { userId: req.user.id } });
        if (!doctor) return res.status(404).json({ error: "Doctor not found" });

        const appointments = await Appointment.findAll({
            where: { doctorId: doctor.id },
            include: [
                {
                    model: Patient,
                    include: [{ model: User, attributes: ["name", "email", "phone"] }]
                }
            ]
        });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) return res.status(404).json({ error: "Appointment not found" });

        await appointment.update({ status });
        res.json({ message: "Appointment updated", appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) return res.status(404).json({ error: "Appointment not found" });

        await appointment.update({ status: "cancelled" });
        res.json({ message: "Appointment cancelled", appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

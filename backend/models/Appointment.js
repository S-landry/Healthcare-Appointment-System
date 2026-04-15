const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Patient = require("./Patient");
const Doctor = require("./Doctor");

const Appointment = sequelize.define("Appointment", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    patientId: { type: DataTypes.INTEGER, allowNull: false },
    doctorId: { type: DataTypes.INTEGER, allowNull: false },
    appointmentDate: { type: DataTypes.DATE, allowNull: false },
    reason: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"), defaultValue: "pending" },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: "appointments", timestamps: true });

Appointment.belongsTo(Patient, { foreignKey: "patientId", onDelete: "CASCADE" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId", onDelete: "CASCADE" });

module.exports = Appointment;

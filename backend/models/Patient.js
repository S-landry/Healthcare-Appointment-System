const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Patient = sequelize.define("Patient", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    dob: { type: DataTypes.DATE },
    gender: { type: DataTypes.ENUM("male", "female", "other") },
    address: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: "patients", timestamps: true });

Patient.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Patient;

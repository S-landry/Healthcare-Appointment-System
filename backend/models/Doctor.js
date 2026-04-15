const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Doctor = sequelize.define("Doctor", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    specialization: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.TEXT },
    availability: { type: DataTypes.JSON, defaultValue: {} },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: "doctors", timestamps: true });

Doctor.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Doctor;

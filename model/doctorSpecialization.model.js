const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const DoctorSpecialization = sequelize.define(
    "DoctorSpecialization",
    {
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      specialization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return DoctorSpecialization;
};

const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const Doctor = sequelize.define(
    "Doctor",
    {
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experience_years: {
        type: DataTypes.INTEGER,
      },
      degree: {
        type: DataTypes.STRING(100),
      },
      certification: {
        type: DataTypes.STRING(255),
      },
      work_location: {
        type: DataTypes.STRING(255),
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return Doctor;
};

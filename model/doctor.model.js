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

  // Define associations
  Doctor.associate = (models) => {
    // Define associations here
    Doctor.belongsToMany(models.Degree, {
      through: "DoctorDegree",
      foreignKey: "doctor_id",
    });
    Doctor.belongsToMany(models.Specialization, {
      through: "DoctorSpecialization",
      foreignKey: "doctor_id",
    });
  };

  return Doctor;
};

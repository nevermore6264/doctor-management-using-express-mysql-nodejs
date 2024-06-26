const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const Specialization = sequelize.define(
    "Specialization",
    {
      specialization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      specialization_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  Specialization.associate = (models) => {
    Specialization.belongsToMany(models.Doctor, {
      through: "DoctorSpecialization",
      foreignKey: "specialization_id",
    });
  };

  return Specialization;
};

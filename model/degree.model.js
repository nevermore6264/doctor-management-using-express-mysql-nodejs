const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const Degree = sequelize.define(
    "Degree",
    {
      degree_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      degree_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return Degree;
};

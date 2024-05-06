const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const Account = sequelize.define(
    "Account",
    {
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return Account;
};

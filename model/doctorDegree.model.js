const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const DoctorDegree = sequelize.define('DoctorDegree', {
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        degree_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    });

    return DoctorDegree;
};

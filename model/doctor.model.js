const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        doctorId : { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            autoIncrement: true, // Thiết lập tự tăng cho cột doctorId
            primaryKey: true // Đánh dấu cột doctorId là khóa chính
        },
        fullName : { type: DataTypes.STRING, allowNull: false },
    };

    const options = {};

    const Doctor = sequelize.define('Doctor', attributes, options);

    // Tạo các mối quan hệ
    Doctor.hasOne(DoctorDetails, { foreignKey: 'doctor_id' });
    Doctor.hasMany(HonorsAndAwards, { foreignKey: 'doctor_id' });
    Doctor.hasMany(ResearchWorks, { foreignKey: 'doctor_id' });
    Doctor.hasMany(ConferencesAttended, { foreignKey: 'doctor_id' });
    Doctor.hasMany(TrainingsAttended, { foreignKey: 'doctor_id' });
    Doctor.hasMany(OrganizationsInvolved, { foreignKey: 'doctor_id' });

    return Doctor;
}

// Import các mô hình liên quan
const DoctorDetails = require('./doctorDetails.model');
const HonorsAndAwards = require('./honorsAndAwards.model');
const ResearchWorks = require('./researchWorks.model');
const ConferencesAttended = require('./conferencesAttended.model');
const TrainingsAttended = require('./trainingsAttended.model');
const OrganizationsInvolved = require('./organizationsInvolved.model');

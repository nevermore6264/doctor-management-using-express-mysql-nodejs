const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
};

async function getAll() {
    return await db.Doctor.findAll();
}

async function getById(id) {
    return await getDoctorById(id);
}

// helper functions
async function getDoctorById(id) {
    const doctor = await db.Doctor.findByPk(id);
    if (!doctor) {
        throw 'Doctor not found';
    }
    return doctor;
}

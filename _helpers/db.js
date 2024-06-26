const config = require("config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

// Initialize an empty object to store models
module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  
  // Add sequelize and query method to db object
  db.sequelize = sequelize;
  db.query = async (sql, options) => {
    return await sequelize.query(sql, options);
  };

  // init models and add them to the exported db object
  const defineDoctorModel = require('../model/doctor.model');
  const defineDegreeModel = require('../model/degree.model');
  const defineDoctorDegreeModel = require('../model/doctorDegree.model');
  const defineSpecializationModel = require('../model/specialization.model');
  const defineDoctorSpecializationModel = require('../model/doctorSpecialization.model');

  // Assign models to the db object
  db.Doctor = defineDoctorModel(sequelize);
  db.Degree = defineDegreeModel(sequelize);
  db.DoctorDegree = defineDoctorDegreeModel(sequelize);
  db.Specialization = defineSpecializationModel(sequelize);
  db.DoctorSpecialization = defineDoctorSpecializationModel(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });

}

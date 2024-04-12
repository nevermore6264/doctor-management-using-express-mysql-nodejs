const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
};

async function getAll() {
  const query = `
            SELECT d.doctor_id, d.full_name, d.experience_years, d.work_location,
            GROUP_CONCAT(distinct dg.degree_name) AS degree_name,
            GROUP_CONCAT(distinct s.specialization_name) AS specialization_name
            FROM doctors d
            LEFT JOIN doctordegrees dd ON d.doctor_id = dd.doctor_id
            LEFT JOIN degrees dg ON dd.degree_id = dg.degree_id
            LEFT JOIN doctorspecializations ds ON d.doctor_id = ds.doctor_id
            LEFT JOIN specializations s ON ds.specialization_id = s.specialization_id
            GROUP BY d.doctor_id
        `;

  const [results] = await db.query(query, {
    type: db.sequelize.QueryTypes.SELECT,
  });

  return results;
}

async function getById(id) {
  return await getDoctorById(id);
}

// helper functions
async function getDoctorById(id) {
  const query = `
    SELECT d.doctor_id, d.full_name, d.experience_years, d.work_location,
    GROUP_CONCAT(distinct dg.degree_name) AS degree_name,
    GROUP_CONCAT(distinct s.specialization_name) AS specialization_name
    FROM doctors d
    LEFT JOIN doctordegrees dd ON d.doctor_id = dd.doctor_id
    LEFT JOIN degrees dg ON dd.degree_id = dg.degree_id
    LEFT JOIN doctorspecializations ds ON d.doctor_id = ds.doctor_id
    LEFT JOIN specializations s ON ds.specialization_id = s.specialization_id
    WHERE d.doctor_id = ${id}
    GROUP BY d.doctor_id
    `;

  const [doctor] = await db.query(query, {
    type: db.sequelize.QueryTypes.SELECT,
  });

  return doctor;
}

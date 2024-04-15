const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  search,
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

async function search(searchParams, page, pageSize) {
  // Xây dựng câu truy vấn cơ sở dữ liệu dựa trên các tham số tìm kiếm và phân trang
  let query = `
      SELECT d.doctor_id, d.full_name, d.experience_years, d.work_location,
      GROUP_CONCAT(DISTINCT dg.degree_name) AS degree_name,
      GROUP_CONCAT(DISTINCT s.specialization_name) AS specialization_name
      FROM doctors d
      LEFT JOIN doctordegrees dd ON d.doctor_id = dd.doctor_id
      LEFT JOIN degrees dg ON dd.degree_id = dg.degree_id
      LEFT JOIN doctorspecializations ds ON d.doctor_id = ds.doctor_id
      LEFT JOIN specializations s ON ds.specialization_id = s.specialization_id
    `;

  const whereClause = [];
  const queryParams = {};

  // Xây dựng điều kiện tìm kiếm nếu có
  if (searchParams) {
    if (searchParams.fullName) {
      whereClause.push(`d.full_name LIKE :fullName`);
      queryParams.fullName = `%${searchParams.fullName}%`;
    }
    // Thêm các điều kiện tìm kiếm khác nếu cần
  }

  // Nếu có điều kiện tìm kiếm, thêm vào truy vấn
  if (whereClause.length > 0) {
    query += ` WHERE ${whereClause.join(" AND ")}`;
  }

  // Thêm phần group by và sắp xếp kết quả
  query += ` GROUP BY d.doctor_id`;

  // Thực hiện phân trang
  if (page && pageSize) {
    const offset = (page - 1) * pageSize;
    query += ` LIMIT :pageSize OFFSET :offset`;
    queryParams.pageSize = parseInt(pageSize);
    queryParams.offset = parseInt(offset);
  }

  // Thực thi truy vấn
  const [results] = await db.query(query, {
    replacements: queryParams,
    type: db.sequelize.QueryTypes.SELECT,
  });

  // Chia các giá trị degrees và specializations thành các mảng
  results.forEach((result) => {
    result.degrees = result.degrees.split(",");
    result.specializations = result.specializations.split(",");
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

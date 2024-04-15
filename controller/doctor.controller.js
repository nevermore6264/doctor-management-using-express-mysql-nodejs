const express = require('express');
const router = express.Router();
const doctorService = require('../service/doctor.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/search', searchDoctors);

module.exports = router;

// route functions

function getAll(req, res, next) {
    doctorService.getAll()
        .then(doctors => res.json(doctors))
        .catch(next);
}

function getById(req, res, next) {
    doctorService.getById(req.params.id)
        .then(doctor => res.json(doctor))
        .catch(next);
}

function searchDoctors(req, res, next) {
    console.log(req);
    // Lấy các tham số tìm kiếm, phân trang và sắp xếp từ query string
    const fullName = req.body.fullName;
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 10;
    const sortBy = req.body.sortBy || 'full_name'; // Mặc định sắp xếp theo tên đầy đủ
    const sortOrder = req.body.sortOrder || 'ASC'; // Mặc định sắp xếp tăng dần
    
    doctorService.search(fullName, page, pageSize, sortBy, sortOrder)
        .then(doctors => res.json(doctors))
        .catch(next);
}
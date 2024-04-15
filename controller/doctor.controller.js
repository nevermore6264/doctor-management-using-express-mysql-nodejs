﻿const express = require('express');
const router = express.Router();
const doctorService = require('../service/doctor.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.get('/search', searchDoctors);

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
    // Lấy các tham số tìm kiếm, phân trang và sắp xếp từ query string
    const searchParams = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const sortBy = req.query.sortBy || 'full_name'; // Mặc định sắp xếp theo tên đầy đủ
    const sortOrder = req.query.sortOrder || 'ASC'; // Mặc định sắp xếp tăng dần
    
    doctorService.getAll(searchParams, page, pageSize, sortBy, sortOrder)
        .then(doctors => res.json(doctors))
        .catch(next);
}
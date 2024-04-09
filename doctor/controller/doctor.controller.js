const express = require('express');
const router = express.Router();
const doctorService = require('../service/doctor.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);

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

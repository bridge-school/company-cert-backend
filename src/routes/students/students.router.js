const express = require('express');

const studentsController = require('./students.controller');

const router = express.Router();

router.get('/', studentsController.index);
router.post('/', studentsController.store);
router.get('/:id', studentsController.show);

module.exports = {
  studentsRouter: router
};

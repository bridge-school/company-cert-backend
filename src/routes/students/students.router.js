const express = require('express');

const studentsController = require('./students.controller');

const router = express.Router();

router.get('/', studentsController.index);
router.post('/', studentsController.store);

module.exports = {
  studentsRouter: router
};

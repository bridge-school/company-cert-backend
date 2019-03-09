const express = require('express');

const studentsController = require('./students.controller');

const router = express.Router();

router.get('/', studentsController.index);

module.exports = {
  studentsRouter: router
};

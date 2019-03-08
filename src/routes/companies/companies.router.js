const express = require('express');

const companiesController = require('./companies.controller');

const router = express.Router();

router.get('/', companiesController.index);
router.post('/', companiesController.store);
router.get('/:id', companiesController.show);

module.exports = {
  companiesRouter: router
};

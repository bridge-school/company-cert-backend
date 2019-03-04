const express = require('express');

const frontendDataController = require('./frontend-data.controller');

const router = express.Router();

router.get('/', frontendDataController.index);

module.exports = {
  frontendDataRouter: router
};

const express = require('express');

const companiesController = require('./companies.controller');

const router = express.Router();

// router.get('', companiesController);

router.get('/', companiesController.index);
router.post('/', companiesController.store);

// router.get('/rangle', (req, res) => {
//   return res.json({ bridge: 'now!' });
// });

module.exports = {
  companiesRouter: router
};

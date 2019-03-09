const express = require('express');

const { companiesRouter } = require('../routes/companies/companies.router');
const { frontendDataRouter } = require('../routes/frontend-data/frontend-data.router');
const { studentsRouter } = require('../routes/students/students.router');

const router = express.Router();
router.use('/companies', companiesRouter);
router.use('/frontend-data', frontendDataRouter);
router.use('/students', studentsRouter);

module.exports = router;

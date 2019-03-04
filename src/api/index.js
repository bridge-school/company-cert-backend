const express = require('express');

const { healthRouter } = require('../routes/health/health.router');
const { companiesRouter } = require('../routes/companies/companies.router');
const { frontendDataRouter } = require('../routes/frontend-data/frontend-data.router');

const router = express.Router();
router.use("/health", healthRouter);
router.use("/companies", companiesRouter);
router.use("/frontend-data", frontendDataRouter);

module.exports = router;

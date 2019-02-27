const express = require("express");

const { healthRouter } = require('../routes/health/health.router')
const { companiesRouter } = require('../routes/companies/companies.router')

const router = express.Router();
router.use("/health", healthRouter);
router.use("/companies", companiesRouter)

module.exports = router;

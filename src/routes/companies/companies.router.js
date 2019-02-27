const express = require('express');

const { companiesController } = require("./companies.controller");

const router = express.Router();

router.get("", companiesController);
router.get("/rangle", (req,res)=>{
    return res.json({bridge: "now!"})
});

module.exports = {
    companiesRouter: router
}

const express = require("express");
const router = express.Router();

const controller = require("../controllers/homepage.controller");

router.get("/", controller.index);

module.exports = router;
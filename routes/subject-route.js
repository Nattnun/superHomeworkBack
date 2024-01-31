const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject-controller");

router.get("/", subjectController.getALl);

module.exports = router;

const express = require("express");
const router = express.Router();
const homeworkController = require("../controllers/homework-controller");
const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, homeworkController.createHomework);
router.get("/", authenticate, homeworkController.getByTeacher);
router.put("/:id", authenticate, homeworkController.update);

module.exports = router;

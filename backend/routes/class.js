const express = require("express");
const router = express.Router();

const {
  createClass,
  getClasses,
  getClassById,
  deleteClass,
} = require("../controllers/class");

router.post("/", createClass);
router.get("/", getClasses);
router.get("/:id", getClassById);
router.delete("/:id", deleteClass);

module.exports = router;

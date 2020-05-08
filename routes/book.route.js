const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({dest: "./public/images/cover_book"});
const controller = require("../controllers/books.controller");

router.get("/", controller.index);
router.get("/new", controller.new);
router.post("/new", upload.single("coverUrl"), controller.postNew);
router.get("/update/:id", controller.update);
router.post("/update", upload.single("coverUrl"),controller.postUpdate);
router.get("/:id/delete", controller.delete);
module.exports = router;
const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "./public/images/avatar" });
const controller = require("../controllers/auth.controller");
const middeware = require("../middewares/auth.middeware");

router.get("/", middeware.authLogin ,controller.index);
router.get("/login", controller.login);
router.post("/login", controller.postLogin);
router.get("/signIn", controller.signIn);
router.post("/signIn", upload.single("avatar"), controller.postSignIn);


module.exports = router;
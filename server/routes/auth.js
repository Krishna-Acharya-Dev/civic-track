const router = require("express").Router;
const cors = require("cors");
const userController = require("../controllers/userController");



router.use(cors);

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/user", userController.getUser);

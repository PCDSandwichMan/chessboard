const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.post("/login", userController.login);

router.post("/create", userController.createNewUser);

router.post("/save", userController.saveGameState);

module.exports = router;

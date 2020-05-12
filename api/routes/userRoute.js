const router = require("express").Router();
const userController = require("../controllers/userController.js");
const passport = require("passport");
const passportConfig = require("../middleware/passport");

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userController.login
);

router.post(
  "/create",
  userController.createNewUser
);

router.post(
  "/save",
  passport.authenticate("jwt", { session: false }),
  userController.saveGameState
);

module.exports = router;

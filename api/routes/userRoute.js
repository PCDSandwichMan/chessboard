const router = require("express").Router();
const userController = require("../controllers/userController.js");
const passport = require("passport");
const passportConfig = require("../middleware/passport");
const { schemas, validateBody } = require("../middleware/bodyValidation");

router.post(
  "/login",
  validateBody(schemas.loginValidation),
  passport.authenticate("local", { session: false }),
  userController.login
);

router.post(
  "/create",
  validateBody(schemas.newUserValidation),
  userController.createNewUser
);

router.post(
  "/save",
  validateBody(schemas.saveGameValidation),
  passport.authenticate("jwt", { session: false }),
  userController.saveGameState
);

router.get(
  "/state",
  passport.authenticate("jwt", { session: false }),
  userController.getUserGameState
);

module.exports = router;

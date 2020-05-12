const User = require("../models/User");
const helpers = require("../utils/helpers");
const bcrypt = require("bcrypt");

module.exports = {
  async login(req, res) {
    try {
      // * Auth handled by passport middleware
      const token = await helpers.genToken(req.user._id);
      res.status(200).json({ token, state: req.user.userGameState });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "unable to validate user at this time" });
    }
  },
  async saveGameState(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, { userGameState: req.body });

      res.status(201).json({ save: "game state has been saved" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "an error occurred while creating your account" });
    }
  },
  async createNewUser(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "must include username and password" });
      }

      if (!(await User.findOne({ username }))) {
        await User.create({
          username,
          password,
        });
      } else {
        return res.status(400).json({ error: "user already exists" });
      }

      return res.status(201).json({ user: "new user created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "unable to create new user" });
    }
  },
};

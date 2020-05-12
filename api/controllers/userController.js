const User = require("../models/User");
const helpers = require("../utils/helpers");
const bcrypt = require("bcrypt");

module.exports = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      
      const findUser = await User.findOne({ username });
      if (!findUser)
        return res.status(401).json({ unauthorized: "invalid credentials" });

      const testPasswordMatch = bcrypt.compare(password, findUser.password);
      if (!testPasswordMatch)
        return res.status(401).json({ unauthorized: "invalid credentials" });

      const token = await helpers.genToken(findUser._id);
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "unable to validate user at this time" });
    }
  },
  async saveGameState(req, res) {
    try {
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

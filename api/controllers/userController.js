const User = require("../models/User");
const helpers = require("../utils/helpers");
const bcrypt = require("bcrypt");

module.exports = {
  async login(req, res) {
    try {
      // * Auth handled by passport middleware
      const token = await helpers.genToken(req.user._id);
       // * Returns token and oldGameState |defaults to store| p.s. I wouldn't if I was either not a solo dev or I was 100% sure the store will not change
      res.status(200).json({
        token,
        state: req.user.userGameState || {
          game: {
            playerOneConfig: {
              selectedIcon: "",
              selectedColor: "",
            },
            playerTwoConfig: {
              selectedIcon: "",
              selectedColor: "",
            },
            currentPlayerTurn: 1,
            boardState: [],
          },
        },
      });
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
      let saveUser;
      // * Save user only if same username does not already exist
      if (!(await User.findOne({ username }))) {
        saveUser = await User.create({
          username,
          password,
        });
      } else {
        return res.status(409).json({ error: "user already exists" });
      }

      const token = await helpers.genToken(saveUser._id);
      return res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "unable to create new user" });
    }
  },
  async getUserGameState(req, res) {
    try {
      // * Returns token for refresh and oldGameState |defaults to store| p.s. I wouldn't if I was either not a solo dev or I was 100% sure the store will not change
      const token = await helpers.genToken(req.user._id);
      res.status(200).json({
        token,
        state: req.user.userGameState || {
          game: {
            playerOneConfig: {
              selectedIcon: "",
              selectedColor: "",
            },
            playerTwoConfig: {
              selectedIcon: "",
              selectedColor: "",
            },
            currentPlayerTurn: 1,
            boardState: [],
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "unable to validate user at this time" });
    }
  },
};

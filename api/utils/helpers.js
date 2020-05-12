const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = {
  async genToken(userID) {
    if (!userID) throw new Error("UserID required to generate token");
    const token = await jwt.sign({ id: userID }, config.JWT_SECRET, {
      expiresIn: "12h",
    });
    return token;
  },
};

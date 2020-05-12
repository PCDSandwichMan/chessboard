if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
};

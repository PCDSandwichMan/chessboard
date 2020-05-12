const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const config = require("./utils/config");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const database = mongoose.connection;

database.on("error", (error) => console.log(error));

database.once("open", () => {
  // - Route Setup
  app.use("/user", require("./routes/userRoute"));

  // - Route 404 Fallback
  app.use((req, res, next) => {
    if (req.accepts("json")) {
      res.status(404).json({ error: "this route could not be found" });
    }
    next();
  });

  app.listen(config.PORT, () =>
    console.log(`listening on http://localhost:${config.PORT}`)
  );
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const server = require("http").Server(app);

dotenv.config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

server.listen(process.env.PORT, () => {
  console.log("Server open on PORT " + process.env.PORT);
});

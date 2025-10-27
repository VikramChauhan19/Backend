const mongoose = require("mongoose");
require("dotenv").config();
const dbconnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Db connected successfuly");
    })
    .catch((err) => {
      console.log("Db connection error");
      console.error(err);
      process.exit(1);
    });
};

module.exports = dbconnect;

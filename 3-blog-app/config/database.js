const mongoose = require("mongoose");
require("dotenv").config();
const connectWithDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Db connected successfuly");
    })
    .catch((err) => {
      console.error(err);
      console.log(err.message);
      process.exit(1);
    });
};
module.exports = connectWithDb;

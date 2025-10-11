//sika purpose he connection establish kerna db or application k beach
const mongoose = require("mongoose"); //mongoose le aye

require("dotenv").config(); // ise jo bhi apne ne env me difine kiya hoga vo process me aa jayega

const dbConnect = () => {
  //fuction create kiya jo establish kerta he connection between your app and databse
  mongoose
    .connect(process.env.DATABASE_URL, {
      //database se connect ker liya
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Db connected successfuly");
    })
    .catch((err) => {
      console.log("Issue in Db connection");
      console.log(err.message);
      process.exit(1);  // Exit the process if DB connection fails
    });
};

module.exports = dbConnect;

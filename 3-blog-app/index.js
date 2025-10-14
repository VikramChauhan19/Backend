const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const connectWithDb = require("./config/database");
connectWithDb();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is homepage baby");
});

const blogRoutes = require("./routes/blog"); //routes file ko bula liya
app.use("/api/v1", blogRoutes); //mount

app.listen(PORT, () => {
  console.log("app running successfuly");
});

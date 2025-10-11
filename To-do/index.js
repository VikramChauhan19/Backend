//server create kiya
const express = require("express");
const app = express();
const dbConnect = require("./config/database");
dbConnect();

//load config from env
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json body
app.use(express.json());

//import routes for todo API
const todoRoutes = require("./routes/todo");
//mount the todo api routes
app.use("/api/v1", todoRoutes);

//default route
app.get("/", (req, res) => {
  res.send(`<h1>This is HOMEPAGE baby</h1>`);
});

//start server
app.listen(PORT, () => {
  console.log(`app running successfuly at ${PORT}`);
});

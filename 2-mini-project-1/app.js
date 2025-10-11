// server creation
const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

//default route
app.get("/", (req, res) => {
  res.render("index");
});

//create Account
app.post("/register", async (req, res) => {
  const { username, name, age, email, password } = req.body;

  let existingUser = await userModel.findOne({ email });
  if (existingUser) return res.status(500).send("user already registered");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = await userModel.create({ username, name, age, email,password:hashedPassword });
  let token = jwt.sign({ email: user.email, userid: user._id }, "shhhh");
  res.cookie("token", token);
  res.send("registered");
});

app.listen(3000, () => {
  console.log("app running successfuly");
});

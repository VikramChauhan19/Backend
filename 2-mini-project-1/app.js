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

//profile
app.get("/profile", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.render("login");
});

//login route
app.get("/login", (req, res) => {
  res.render("login");
});

//create Account
app.post("/register", async (req, res) => {
  const { username, name, age, email, password } = req.body;

  let existingUser = await userModel.findOne({ email });
  if (existingUser) return res.status(500).send("user already registered");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = await userModel.create({
    username,
    name,
    age,
    email,
    password: hashedPassword,
  });
  let token = jwt.sign({ email: user.email, userid: user._id }, "shhhh");
  res.cookie("token", token);
  res.send("registered");
});

//login account
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let existingUser = await userModel.findOne({ email });
  if (!existingUser) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, existingUser.password, (err, result) => {
    if (result) {
      let token = jwt.sign(
        { email: existingUser.email, userid: existingUser._id },
        "shhhh"
      );
      res.cookie("token", token);
      res.status(200).send("you can login");
    } else res.redirect("/login");
  });
});

//logout
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {  //midleware
  if (req.cookies.token === "") res.send("you must be logged in");
  else {
    let data = jwt.verify(req.cookies.token, "shhhh");
    req.user = data;
  }
  next();
}

app.listen(3000, () => {
  console.log("app running successfuly");
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

//signup route handler
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;

    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exist",
      });
    }

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(200).json({
      success: true,
      message: "user created successfuly",
      data: user,
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "user cannot be registered, please try again later",
    });
  }
};

//login route handler
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details correctly",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };

    // Convert to plain object and remove password
    const userData = user.toObject();
    delete userData.password;
    userData.token = token;

    return res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user: userData,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "User cannot be logged in, please try again later",
    });
  }
};

const bcrypt = require("bcrypt");
const userModel = require("../models/user");

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

    const user =await userModel.create({ name, email,password: hashedPassword, role });
    res.status(200).json({
      success: true,
      message: "user created successfuly",
      data: user,
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      message: "user cannot be registered, please try again later",
    });
  }
};

//login route handler

const Todo = require("../models/Todo");

module.exports.getTodo = async (req, res) => {
  try {
    //fetch all todo item
    const todo = await Todo.find();
    //response
    res.status(200).json({
      success: true,
      data: todo,
      message: "entire Todo data is fetched",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "server error",
    });
  }
};

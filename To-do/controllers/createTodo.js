//import the model
const Todo = require("../models/Todo");

//define route handler
module.exports.createTodo = async (req, res) => {
  try {
    //extract title and describtion
    const { title, description } = req.body;
    //create new todo and insert in db
    const response = await Todo.create({ title, description });
    //send a json respnse with a success flag
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry is created",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};

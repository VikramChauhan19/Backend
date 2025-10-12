const Todo = require("../models/Todo");

module.exports.getTodos = async (req, res) => {
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

module.exports.getTodoById = async (req, res) => {
  try {
    //extract todo item by id
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });

    //data is not found
    if (!todo) {
      res.status(404).json({
        success: false,
        data: "no data was found with given id",
      });
    } else {
      res.status(200).json({
        success: true,
        data: todo,
        message: "data was found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "server error",
    });
  }
};

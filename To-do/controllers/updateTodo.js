const Todo = require("../models/Todo");

module.exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!todo) {
      res.status(404).json({
        success: false,
        data: "no Todo found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: todo,
        message: "Data updated successfuly",
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

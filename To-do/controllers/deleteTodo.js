const Todo = require("../models/Todo");

module.exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "No Todo found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
      message: "Todo deleted successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server error",
    });
  }
};
 
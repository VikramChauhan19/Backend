//import model
const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    const comment = await commentModel.create({ post, user, body });
    //find post and then add comment in posta array
    const updatedpost = await postModel
      .findByIdAndUpdate(
        post,
        { $push: { comments: comment._id } },
        { new: true }
      )
      .populate("comments") //populate the comments array with comments document
      .exec();
    res.status(200).json({
      success: true,
      post: updatedpost,
      data: comment,
      message: "comment created successfuly",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};

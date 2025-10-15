const likeModel = require("../models/likeModel");
const postModel = require("../models/postModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = await likeModel.create({ post, user });
    const updatedPost = await postModel.findByIdAndUpdate(
      post,
      { $push: { likes: like._id } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: like,
      post: updatedPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: " server error",
      message: err.message,
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = await likeModel.findOne({ post, user });
    await likeModel.findByIdAndDelete(like._id);

    const updatedPost = await postModel
      .findByIdAndUpdate(
        post,
        { $pull: { likes: like._id } }, // remove like ID from post.likes array
        { new: true }
      )
      .populate("likes")
      .exec();

    res.status(200).json({
      success: true,
      message: "Like removed successfully.",
      post: updatedPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: " server error",
      message: err.message,
    });
  }
};

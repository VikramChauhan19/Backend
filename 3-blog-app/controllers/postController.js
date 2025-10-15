const postModel = require("../models/postModel");
const likeModel = require("../models/commentModel");
const commentModel = require("../models/likeModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body, likes, comments } = req.body;
    const post = await postModel.create({ title, body, likes, comments });
    res.status(200).json({
      success: true,
      data: post,
      message: "post created successfuly",
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

exports.getAllPost = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("likes")
      .populate("comments")
      .exec();
    res.status(200).json({
      success: true,
      data: posts,
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

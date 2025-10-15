const express = require("express");
const router = express.Router();

//import controller
const { createComment } = require("../controllers/commentController");
const { likePost,unlikePost } = require("../controllers/likeController");
const { createPost, getAllPost } = require("../controllers/postController");

//mapping route with controller
router.post("/comment/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPost);
router.get("/likes/createLike", likePost );
router.get("/likes/removeLike", unlikePost );

//export route
module.exports = router;

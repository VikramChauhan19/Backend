const express = require("express");
const router = express.Router();

//import controller
const { createComment } = require("../controllers/commentController");
const { createPost } = require("../controllers/postController");

//mapping route with controller
router.post("/comment/create", createComment);
router.post("/createPost", createPost);

//export route
module.exports = router;

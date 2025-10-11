const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/miniproject1");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  content: String,
  likes: [   //array type
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("post", postSchema);

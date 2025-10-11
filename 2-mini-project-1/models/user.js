const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/miniproject1");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  posts:[
    {
        type:mongoose.Schema.Types.ObjectId,   //MongoDB assigns a unique _id to every document.
        ref:"post"           //Each element in this array will store the ID of another document.
    }
  ]
});

module.exports = mongoose.model("user",userSchema);

const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
    "post":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    },
    "user":{
        type:String,
        required:true,
    },
    "body":String,


})
module.exports = mongoose.model("comment",commentSchema);
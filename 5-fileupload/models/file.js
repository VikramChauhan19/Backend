const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    imageurl:{
        type:String
    },
    tags:{
        type:String
    },
    emails:{
        type:String
    }
});

module.exports = mongoose.model("file",fileSchema);
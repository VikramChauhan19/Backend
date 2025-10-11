const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  //schema screate ker rhe he
  //schema is describtion of your data

  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  describtion: {
    type: String,
    required: true,
    maxLength: 50,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.export = mongoose.model("Todo", todoSchema); //model create hoga Todos nam se on todoSchema structure

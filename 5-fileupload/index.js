const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// default route

app.get("/",(req,res)=>{
    res.send(" hellow Vikram");
})

app.listen(PORT, ()=>{
    console.log(`app running successfuly on PORT ${PORT}`);
})
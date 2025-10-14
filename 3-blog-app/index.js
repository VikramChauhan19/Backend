const express = require("express");
const app = express();

app.get("/",(req ,res)=>{
    res.send("this is homepage baby");
})

app.listen(3000, ()=>{
    console.log("app running successfuly")
})
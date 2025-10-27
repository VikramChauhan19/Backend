const express = require("express")
const router = express.Router();
const {localFileUpload} = require("../controllers/fileupload")

router.post("/localFileUpload", localFileUpload);

router.get("/",(req,res)=>{
    res.send("hii Vikram");
})

module.exports = router;
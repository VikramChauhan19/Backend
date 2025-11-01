const express = require("express")
const router = express.Router();
const {localFileUpload ,imageUpload, videoUpload,imageSizeReducer} = require("../controllers/fileupload")

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

router.get("/",(req,res)=>{
    res.send("hii Vikram");
})

module.exports = router;
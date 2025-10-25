const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");


router.post("/signup",signup);
router.post("/login",login);


//protected route
router.get("/student",auth, isStudent,(req,req)=>{
    res.json({
        success:true,
        message:"You are welcome to the protected route for students"
    });   
})
router.get("/admin",auth, isAdmin,(req,req)=>{
    res.json({
        success:true,
        message:"You are welcome to the protected route for admins"
    });   
})

module.exports = router;
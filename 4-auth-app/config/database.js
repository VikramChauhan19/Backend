
const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("Db connected successfuly")
    }).catch((err)=>{
        console.log("Db connection issues");
        console.error(err);
        process.exit(1);
    })

} 
module.exports = dbConnect;
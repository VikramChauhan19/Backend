const express = require("express");
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser")
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());


dbConnect();

//route import and maount

app.get("/", (req, res) => {
  res.send("Welcome to the API Home Route 🚀");
});

const userRoutes = require("./routes/user");
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`app running successfuly at PORT ${PORT}`);
});

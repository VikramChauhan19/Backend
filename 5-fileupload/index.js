// Entry point for the file-upload microservice
// - Uses express for HTTP server
// - Uses express-fileupload for handling multipart/form-data uploads
// - Initializes database and Cloudinary configuration, mounts routes, and starts the server
const express = require("express");
const app = express();

// Load environment variables from a .env file into process.env
require("dotenv").config();

// -------------------------
// Middleware
// -------------------------
// Parse incoming JSON payloads (for APIs that send JSON bodies)
app.use(express.json());

// Attach express-fileupload middleware to handle file uploads (req.files)
// You can pass options to fileupload() here if needed (limits, tempFileDir, etc.)
const fileupload = require("express-fileupload");
app.use(fileupload());

// -------------------------
// Configuration / Initialization
// -------------------------
// Port configuration: prefer environment variable, otherwise fall back to 4000
const PORT = process.env.PORT || 4000;

// Initialize database connection. The module in ./config/database should
// export a function that connects to the DB (e.g. MongoDB) and handles errors.
const db = require("./config/database");
db();

// Initialize Cloudinary (or other cloud storage) setup used for storing uploaded files
// The module at ./config/cloudinary should configure the cloudinary client with
// credentials from environment variables.
const cloudinary = require("./config/cloudinary");
cloudinary();

// -------------------------
// Routes
// -------------------------
// Mount the upload-related routes under /api/v1/upload
// The routes should handle receiving files (req.files), validating them,
// uploading to Cloudinary (or local storage), and returning URLs/metadata.
const Upload = require("./routes/fileUpload");
app.use("/api/v1/upload", Upload);

// -------------------------
// Start server
// -------------------------
// Start listening on the configured port. In production consider adding
// graceful shutdown and more robust error handling.
app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});

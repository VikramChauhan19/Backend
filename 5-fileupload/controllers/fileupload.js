// Import file model (likely for DB operations)
const fileModel = require("../models/file");

// Handle local file uploads
exports.localFileUpload = async (req, res) => {
    try {
        // Get uploaded file
        const file = req.files.file;
        console.log(file);

        // Save file locally with a unique name
        let path = __dirname + "/files/" + Date.now()+`.${file.name.split(".")[1]}`;
        file.mv(path, (err) => {
            if (err) console.log(err);
        });

        // Respond with success
        res.json({ success: true, message: "Local file uploaded successfully" });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ success: false, message: "Local file upload failed" });
    }
};
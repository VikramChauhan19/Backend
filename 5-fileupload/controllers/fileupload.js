// Import file model (likely for DB operations)
const e = require("express");
const fileModel = require("../models/file");
const cloudinary = require("cloudinary").v2;

// Handle local file uploads
exports.localFileUpload = async (req, res) => {
  try {
    // Get uploaded file
    const file = req.files.file;
    console.log(file);

    // Save file locally with a unique name
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    file.mv(path, (err) => {
      if (err) console.log(err);
    });

    // Respond with success
    res.json({ success: true, message: "Local file uploaded successfully" });
  } catch (err) {
    // Handle errors
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Local file upload failed" });
  }
};

exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported. Only jpg, jpeg, png are allowed.",
      });
    }
    //fill fromat supported
    const response = await uploadFileToCloudinary(file, "5-fileUpload");
    console.log("cloudinary response", response);
    //db me entry save kerni he
    const fileData = await fileModel.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: response.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};
async function uploadFileToCloudinary(file, folder,quality) {
  const options = { folder };
  if(quality){
    options.quality=quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.videoFile;
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB limit.",
      });
    }
    console.log(file);
    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported. Only mp4, mov are allowed.",
      });
    }
    console.log("uploading to 5-fileUpload");
    const response = await uploadFileToCloudinary(file, "5-fileUpload/videos");
    console.log("cloudinary response", response);

    //db me entry save kerni he
    const fileData = await fileModel.create({
      name,
      tags,
      email,
      videoUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      videoUrl: response.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Video upload failed",
    });
  }
};
exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported. Only jpg, jpeg, png are allowed.",
      });
    }
    //fill fromat supported
    const response = await uploadFileToCloudinary(file, "5-fileUpload",30);
    console.log("cloudinary response", response);
    //db me entry save kerni he
    const fileData = await fileModel.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: response.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Image size reduction failed",
    });
  }
};

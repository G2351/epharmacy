"use strict";
require("dotenv").config();
const cloudinary = require("../config/cloudinary");

class UploadController {
  static handleUploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Không có file upload",
        });
      }

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "epharmacy",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      return res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result.secure_url, 
      });

    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Upload thất bại",
      });
    }
  };
}

module.exports = UploadController;
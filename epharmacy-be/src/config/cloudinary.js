const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME || 'db7qyis4q',
     api_key: process.env.CLOUDINARY_API_KEY || '485599892723763',
     api_secret: process.env.CLOUDINARY_API_SECRET || 'pfZdO9uYd6ii5pUGRVGHVNDx-g0'
});

module.exports = cloudinary;
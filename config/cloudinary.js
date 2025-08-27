import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import 'dotenv/config';

// Configure Cloudinary
const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("Cloudinary Configured ✅");
};

// Multer storage for images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff'], // accept multiple formats
  },
});

// ✅ Named exports
export  { cloudinary, storage };

// ✅ Default export
export default connectCloudinary;

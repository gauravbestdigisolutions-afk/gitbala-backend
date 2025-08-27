import multer from "multer";
import path from "path";
import fs from "fs";

// Uploads folder path
const uploadDir = path.join("uploads");

// ✅ Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Uploads folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // file extension
    const uniqueName = file.fieldname + "-" + Date.now() + ext;
    cb(null, uniqueName);
  },
});

// Initialize upload
const upload = multer({ storage });

export default upload;
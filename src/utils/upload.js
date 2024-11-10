import multer from 'multer';
import path from 'path';

// Set storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profileImages/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
  
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error('Only image files (jpg, jpeg, png) are allowed'), false);
    }
  
    cb(null, true);
  };

export const uploadProfileImage = multer({
  storage,
  fileFilter,
}).single('profileImage');
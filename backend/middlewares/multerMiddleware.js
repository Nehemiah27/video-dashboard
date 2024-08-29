import fs from "fs";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};
ensureDirectoryExists("uploads");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") cb(null, true);
  else cb("Only .mp4 format allowed!", false);
};

export const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError)
    return res.status(400).json({
      success: false,
      data: null,
      message: err.message || "File upload error",
    });
  else if (err)
    return res.status(400).json({
      success: false,
      data: null,
      message: typeof err === "string" ? err : "File upload error",
    });

  next();
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: fileFilter,
});

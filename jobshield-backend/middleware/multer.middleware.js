import multer from "multer";
const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp"]);
const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => callback(allowedTypes.has(file.mimetype) ? null : new Error("Only PNG, JPEG and WEBP images are supported"), allowedTypes.has(file.mimetype)),
});
export default multerUpload;

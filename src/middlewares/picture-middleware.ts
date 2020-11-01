
import multer from "multer";

const highQualityImagePath = "upload/high_quality_images"
const thumbnailPath = "upload/thumbnails"
multer({ dest: "upload/" });
multer({ dest: highQualityImagePath });
multer({ dest:  thumbnailPath });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const {fieldname} = file
    let path = (fieldname == "thumbnail") ? thumbnailPath : highQualityImagePath 
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.png`);
  },
});

const upload = multer({ storage: storage });
export const pictureUploadMiddleware = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "highQualityImage", maxCount: 1 },
]);



import multer from "multer";
import path from "path";

export const multerOptions = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"));
            return;
        }
        cb(null, true);
    },
});
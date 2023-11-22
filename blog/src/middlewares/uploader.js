import multer from "multer";
import { BadRequestError } from "../utils/errors";

const storage = multer.diskStorage({
  destination:"./public/uploads",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '_' + file.originalname.replace(/\s/g, '_');
    cb(null, uniqueName);
  },
});

const VALID_MIME_TYPES = ['image/png' ,'image/jpg']

function fileFilter(req, file, cb) {
    if (VALID_MIME_TYPES.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(new BadRequestError('Unvalid file type'))
    }
}

const uploader = multer({
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  storage,
  fileFilter
});

export default uploader

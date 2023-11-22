import { Router } from "express";
import FileController from '../../controllers/api/file'
import uploader from "../../middlewares/uploader";
import acl from "../../middlewares/acl";

const router = Router()

router.post('/',acl('WRITER'), uploader.single('pic'),FileController.upload)

export default router
import { Router } from "express";
import AuthController from "../../controllers/api/auth";

const router = Router()

router.post('/login', AuthController.login)


export default router
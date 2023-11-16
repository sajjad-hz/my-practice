import { Router } from "express";
import AuthController from "../../controllers/api/auth";
import { validate } from "express-jsonschema";
import { loginSchema } from "../../validators/auth";

const router = Router();

router.post("/login", validate(loginSchema), AuthController.login);

export default router;

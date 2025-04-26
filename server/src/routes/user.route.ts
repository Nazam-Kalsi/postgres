import { Router } from "express";
import { registerUser, userLogin } from "../controller/user.controller";

const router = Router();

router.route('/sign-up').post(registerUser);
router.route('/sign-in').post(userLogin);

export default router;
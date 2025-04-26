import { Router } from "express";
import { verifyUser } from "../middleware/authMiddleware";
import { createPost } from "../controller/post.controller";

const router = Router();

router.route('/create-post').post(verifyUser,createPost);

export default router;
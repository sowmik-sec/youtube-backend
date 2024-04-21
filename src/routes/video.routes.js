import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getAllVideos } from "../controllers/video.controller";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllVideos);

export default router;

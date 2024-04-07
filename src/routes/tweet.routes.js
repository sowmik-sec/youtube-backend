import { Router } from "express";
import {
  createTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // protect all routes in this file

router.route("/").post(createTweet);

router.route("/user/:userId").get(getUserTweets);

router.route("/:tweetId").patch(updateTweet);

export default router;

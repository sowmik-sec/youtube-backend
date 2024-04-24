import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addVideoToPlaylist,
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
  updatedPlaylist,
} from "../controllers/playlist.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createPlaylist);

router.route("/:playlistId").get(getPlaylistById).patch(addVideoToPlaylist);

router.route("/user/:userId").get(getUserPlaylists);

export default router;

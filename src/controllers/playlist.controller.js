import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }
  const playlist = await Playlist.create({
    name,
    description,
    owner: req.user?._id,
  });
  if (!playlist) {
    throw new ApiError(500, "Failed to create playlist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully"));
});

export { createPlaylist };

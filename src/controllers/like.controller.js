import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { userId } = req.user;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }
  const like = await Like.findOne({ video: videoId, likedBy: userId });
  if (like) {
    await Like.findByIdAndDelete(like?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, "Video unliked"));
  }
  await Like.create({ video: videoId, likedBy: userId });
  return res.status(200).json(new ApiResponse(200, like, "Video liked"));
});

export { toggleVideoLike };

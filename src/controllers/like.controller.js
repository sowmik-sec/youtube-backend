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
  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Video liked"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.user;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }
  const like = await Like.findOne({ comment: commentId, likedBy: userId });
  if (like) {
    await Like.findByIdAndDelete(like?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, "Comment unliked"));
  }
  await Like.create({ comment: commentId, likedBy: userId });
  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Comment liked"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { userId } = req.user;
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id");
  }
  const like = await Like.findOne({ tweet: tweetId, likedBy: userId });
  if (like) {
    await Like.findByIdAndDelete(like?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, "Tweet unliked"));
  }
  await Like.create({ tweet: tweetId, likedBy: userId });
  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Tweet liked"));
});

export { toggleVideoLike, toggleCommentLike };

import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const comments = await Comment.findById({ videoId })
    .skip(skip)
    .limit(limit)
    .populate("user");
  if (!comments) {
    throw new ApiError(404, "No comments found");
  }
  const total = await Comment.countDocuments({ videoId });
  return res
    .status(200)
    .json(
      new ApiResponse(200, { comments, total }, "Comments fetched successfully")
    );
});

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Content is required");
  }
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  const userId = req.user._id;
  const comment = await Comment.create({
    video: videoId,
    content,
    owner: userId,
  });
  if (!comment) {
    throw new ApiError(500, "failed to add comment please try again");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"));
});

export { getVideoComments, addComment };

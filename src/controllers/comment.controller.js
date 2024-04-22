import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export { getVideoComments };

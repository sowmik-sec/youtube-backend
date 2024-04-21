import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { [sortBy]: sortType },
  };
  const queryOptions = {};
  if (query) {
    queryOptions.title = { $regex: query, $options: "i" };
  }
  if (userId) {
    queryOptions.owner = userId;
  }
  const videos = await Video.paginate(queryOptions, options);
  return res.json(new ApiResponse(videos));
});

export { getAllVideos };

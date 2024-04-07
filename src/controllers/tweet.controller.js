import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;
  // check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // create the tweet
  const tweet = new Tweet({ content, owner: userId });

  // save the tweet to the database
  await tweet.save();

  // send the response with the tweet
  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

export { createTweet };

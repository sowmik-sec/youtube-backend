import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    throw new ApiError(400, error?.message || "Tweet cannot be created");
  }
});

const getUserTweets = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    // check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const tweets = await Tweet.find({ owner: userId });
    return res
      .status(200)
      .json(new ApiResponse(200, tweets, "User tweets fetched successfully"));
  } catch (error) {
    throw new ApiError(400, error?.message || "User tweets cannot be fetched");
  }
});

export { createTweet, getUserTweets };

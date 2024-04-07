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
    const tweet = await Tweet.create({ content, owner: userId });

    if (!tweet) {
      throw new ApiError(500, "failed to create tweet please try again");
    }

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

const updateTweet = asyncHandler(async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const { content } = req.body;
    // check if the tweet exists
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      throw new ApiError(404, "Tweet not found");
    }
    tweet.content = content;
    await tweet.save();
    return res
      .status(200)
      .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
  } catch (error) {
    throw new ApiError(400, error?.message || "Tweet cannot be updated");
  }
});

const deleteTweet = asyncHandler(async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    await Tweet.findByIdAndDelete(tweetId);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Tweet deleted successfully"));
  } catch (error) {
    throw new ApiError(400, error?.message || "Tweet cannot be deleted");
  }
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };

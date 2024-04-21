import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const healthCheck = asyncHandler(async (req, res) => {
  // build a healthCheck response that simply returns the ok status as json with a message
  const response = new ApiResponse(200, { message: "ok" }, "OK");
  return res.status(response.statusCode).json(response);
});

export { healthCheck };

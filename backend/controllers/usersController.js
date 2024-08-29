import {
  userErrors,
  userResponses,
  userSearchErrors,
} from "../constant/message.constant.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";
import {
  isFirstNameUnique,
  createNewUser,
  userResults,
  userUpdates,
  userVideoList,
} from "../services/userService.js";

export const createUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    if (user.code === 200)
      return successResponse(res, userResponses.USER_CREATE_SUCCESS);
    else return errorResponse(res, userErrors.DUPLICATE_USER, 409);
  } catch (error) {
    next(error);
  }
};

export const usersSearch = async (req, res) => {
  try {
    const searchResults = await userResults(req.body);
    return successResponse(res, searchResults.message, searchResults.data);
  } catch (error) {
    console.log(error, "error");
    return errorResponse(res, userSearchErrors.USERS_ERROR, 500, error.stack);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateStatus = await userUpdates(req.body);
    if (updateStatus === 200)
      return successResponse(res, userResponses.USER_UPDATE_SUCCESS, null);
    else return errorResponse(res, userErrors.USER_NOT_FOUND, 404);
  } catch (error) {
    console.log(error, "error");
    return errorResponse(res, userSearchErrors.USERS_ERROR, 500, error.stack);
  }
};

export const userVideos = async (req, res) => {
  const params = req.params.userID;
  try {
    const videoList = await userVideoList(params);
    if (videoList.code === 200)
      return successResponse(
        res,
        userResponses.USER_UPDATE_SUCCESS,
        videoList.data
      );
    else return errorResponse(res, userErrors.USER_NOT_FOUND, 404);
  } catch (error) {
    console.log(error, "error");
    return errorResponse(res, userSearchErrors.USERS_ERROR, 500, error.stack);
  }
};

const createUser = async (userInfo) => {
  const email = userInfo.email.toLowerCase(),
    uniqueStatus = await isFirstNameUnique(userInfo.firstName);
  if (!uniqueStatus)
    return { code: 409, message: userErrors.DUPLICATE_USER, success: false };
  const createStatus = await createNewUser(userInfo, email);
  return {
    code: 200,
    message: createStatus,
    success: true,
  };
};

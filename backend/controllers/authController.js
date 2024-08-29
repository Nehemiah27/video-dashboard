import { errorResponse, successResponse } from "../helpers/responseHelper.js";
import { authErrors } from "../constant/message.constant.js";
import { userAuth } from "../services/authService.js";

export const loginUser = async (req, res) => {
  const { firstName, password } = req.body;
  try {
    const authCheck = await userAuth(firstName, password);
    if (authCheck.code === 200)
      return successResponse(res, authCheck.message, authCheck.data);
    else return errorResponse(res, authCheck.message, authCheck.code);
  } catch (error) {
    console.log(error, "error");
    return errorResponse(res, authErrors.AUTH_ERROR, 500, error.stack);
  }
};

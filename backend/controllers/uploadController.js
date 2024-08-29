import {
  serverErrors,
  uploadErrors,
  uploadResponses,
} from "../constant/message.constant.js";
import { errorResponse, successResponse } from "../helpers/responseHelper.js";
import { saveFileMeta } from "../services/uploadService.js";
import { uploadSchema } from "../validations/uploadValidation.js";
import fs from "fs";

export const uploadVideo = async (req, res) => {
  try {
    if (req.file === undefined)
      return errorResponse(res, uploadErrors.NO_FILE_GIVEN, 400);
    const { error } = uploadSchema.validate(req.body);
    if (error) {
      fs.existsSync(`uploads/${req.file.filename}`) &&
        fs.unlinkSync(`uploads/${req.file.filename}`);
      return errorResponse(res, error.details[0].message, 400);
    }
    await saveFileMeta(req.file.filename, req.user.userID, req.body);
    return successResponse(res, uploadResponses.VIDEO_UPLOAD_SUCCESS, null);
  } catch (error) {
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

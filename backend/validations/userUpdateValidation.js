import Joi from "joi";
import userRegex from "../constant/regex.constant.js";
import { userErrors } from "../constant/message.constant.js";

export const userUpdateSchema = Joi.object({
  firstName: Joi.string().pattern(userRegex.NAME_REGEX).required().messages({
    "any.required": userErrors.FIRST_NAME_REQUIRED,
    "string.empty": userErrors.FIRST_NAME_EMTPY,
    "string.base": userErrors.FIRST_NAME_STRING,
    "string.pattern.base": userErrors.FIRST_NAME_INVALID,
  }),
  userAvatar: Joi.string().allow("").optional().messages({
    "string.base": userErrors.USER_AVATAR_STRING,
  }),
  userBio: Joi.string().allow("").max(500).optional().messages({
    "string.base": userErrors.USER_BIO_STRING,
    "string.max": userErrors.USER_BIO_MAX,
  }),
});

import Joi from "joi";
import { authErrors } from "../constant/message.constant.js";
import userRegex from "../constant/regex.constant.js";

export const loginSchema = Joi.object({
  firstName: Joi.string().pattern(userRegex.NAME_REGEX).required().messages({
    "any.required": authErrors.FIRST_NAME_REQUIRED,
    "string.empty": authErrors.FIRST_NAME_EMTPY,
    "string.base": authErrors.FIRST_NAME_STRING,
    "string.pattern.base": authErrors.FIRST_NAME_INVALID,
  }),
  password: Joi.string().required().messages({
    "any.required": authErrors.PASSWORD_REQUIRED,
    "string.empty": authErrors.PASSWORD_EMPTY,
    "string.base": authErrors.PASSWORD_STRING,
  }),
});

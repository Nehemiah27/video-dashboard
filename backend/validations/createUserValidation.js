import Joi from "joi";
import userRegex from "../constant/regex.constant.js";
import { userErrors } from "../constant/message.constant.js";

export const userSchema = Joi.object({
  firstName: Joi.string().pattern(userRegex.NAME_REGEX).required().messages({
    "any.required": userErrors.FIRST_NAME_REQUIRED,
    "string.empty": userErrors.FIRST_NAME_EMTPY,
    "string.base": userErrors.FIRST_NAME_STRING,
    "string.pattern.base": userErrors.FIRST_NAME_INVALID,
  }),
  lastName: Joi.string().pattern(userRegex.NAME_REGEX).required().messages({
    "any.required": userErrors.LAST_NAME_REQUIRED,
    "string.empty": userErrors.LAST_NAME_EMTPY,
    "string.base": userErrors.LAST_NAME_STRING,
    "string.pattern.base": userErrors.LAST_NAME_INVALID,
  }),
  email: Joi.string().pattern(userRegex.EMAIL_REGEX).required().messages({
    "any.required": userErrors.EMAIL_REQUIRED,
    "string.empty": userErrors.EMAIL_EMPTY,
    "string.base": userErrors.EMAIL_STRING,
    "string.pattern.base": userErrors.EMAIL_INVALID,
  }),
  phone: Joi.string().pattern(userRegex.PHONE_REGEX).required().messages({
    "any.required": userErrors.PHONE_REQUIRED,
    "string.empty": userErrors.PHONE_EMPTY,
    "string.base": userErrors.PHONE_STRING,
    "string.pattern.base": userErrors.PHONE_INVALID,
  }),
});

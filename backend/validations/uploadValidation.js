import Joi from "joi";
import { uploadErrors } from "../constant/message.constant.js";

export const uploadSchema = Joi.object({
  title: Joi.string().max(30).required().messages({
    "any.required": uploadErrors.TITLE_REQUIRED,
    "string.empty": uploadErrors.TITLE_EMTPY,
    "string.base": uploadErrors.TITLE_STRING,
    "string.max": uploadErrors.TITLE_MAX,
  }),
  description: Joi.string().max(120).required().messages({
    "any.required": uploadErrors.DESCRIPTION_REQUIRED,
    "string.empty": uploadErrors.DESCRIPTION_EMTPY,
    "string.base": uploadErrors.DESCRIPTION_STRING,
    "string.max": uploadErrors.DESCRIPTION_MAX,
  }),
  thumbnail: Joi.string().required().messages({
    "any.required": uploadErrors.THUMBNAIL_REQUIRED,
    "string.empty": uploadErrors.THUMBNAIL_EMTPY,
    "string.base": uploadErrors.THUMBNAIL_STRING,
  }),
});

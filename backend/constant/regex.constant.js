const userRegex = {
  EMAIL_REGEX:
    /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){1,}@([\w\-]+)((\.[a-zA-Z0-9_-]{2,})+)$/,
  NAME_REGEX: /^[A-Za-z]{3,}$/,
  PHONE_REGEX: /^\d{10}$/,
};
export default userRegex;

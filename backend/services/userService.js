import User from "../models/users.js";
import { v4 as uuid } from "uuid";
import { hashPassword } from "./encryptionService.js";
import {
  userResponses,
  userSearchResponses,
} from "../constant/message.constant.js";
import {
  searchAgg,
  shaping,
  grouping,
  docSummary,
  videoGathering,
  videoListLookUp,
} from "../helpers/usersAggHelper.js";
import { sendEmail } from "./mailService.js";

export const isFirstNameUnique = async (firstName) => {
  const user = await User.find({
    firstName,
  }).lean();
  if (user && user.length) return false;
  return true;
};

export const createNewUser = async (userInfo, email) => {
  const randomPassword = generatePassword(userInfo),
    mailStatus = await sendEmail(email, "Account Credentials", "/welcome", {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email,
      password: randomPassword,
    });
  await User.create({
    ...userInfo,
    email,
    password: await hashPassword(randomPassword),
    userID: uuid(),
  });
  if (mailStatus) return userResponses.USER_CREATE_SUCCESS;
  else return userResponses.USER_CREATE_SUCCESS_WITHOUT_MAIL;
};

export const userUpdates = async (userInfo) => {
  const { firstName, ...updateInfo } = userInfo,
    user = await User.find({
      firstName,
    }).lean();
  if (!user || !user.length) return 404;
  await User.findOneAndUpdate({ firstName }, updateInfo);
  return 200;
};

export const userResults = async (tableInfo) => {
  const { searchText, currentPage, totalRecordsPerPage } = tableInfo,
    searchResults = await User.aggregate([
      searchAgg(searchText),
      shaping(),
      videoGathering(),
      grouping(),
      docSummary(currentPage, totalRecordsPerPage),
    ]);
  return {
    data: searchResults.length
      ? searchResults[0]
      : { data: [], totalRecords: 0 },
    message: userSearchResponses.RESULTS_FETCH,
  };
};

export const userVideoList = async (userID) => {
  const user = await User.find({
    userID,
  }).lean();
  if (!user || !user.length) return { code: 200, data: [] };
  const list = await User.aggregate([
    { $match: { userID } },
    videoListLookUp(),
    {
      $project: {
        _id: false,
        password: false,
        __v: 0,
      },
    },
  ]);
  return { code: 200, data: list.length ? list[0].videos : [] };
};

const generatePassword = (userInfo) => {
  const { firstName, lastName, phone } = userInfo;
  const part1 = firstName.slice(0, 3),
    part2 = lastName.slice(-3),
    part3 = phone.slice(0, 2);
  let password = `${part1}${part2}${part3}`;
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
  return password;
};

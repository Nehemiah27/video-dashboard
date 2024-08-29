import Video from "../models/video.js";

export const saveFileMeta = async (fileName, userID, fileMeta) => {
  await Video.create({ fileName, userID, ...fileMeta });
};

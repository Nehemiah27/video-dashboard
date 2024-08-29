import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
      userID: {
        type: String,
        required: true,
        trim: true,
      },
      fileName: {
        type: String,
        required: true,
        trim: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      thumbnail: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  ),
  Video = mongoose.model("Video", videoSchema);

export default Video;

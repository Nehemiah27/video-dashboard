import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { multerErrorHandler, upload } from "../middlewares/multerMiddleware.js";
import { uploadVideo } from "../controllers/uploadController.js";

const router = express.Router();

/**
 * @swagger
 * /api/uploads/video:
 *   post:
 *     summary: Upload of a Video
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: The video file to upload(must be .mp4 and less than 6MB)
 *               title:
 *                 type: string
 *                 example: "Nature Capture"
 *               description:
 *                 type: string
 *                 example: "Exploring the creative natural beauty"
 *               thumbnail:
 *                 type: string
 *                 example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
 *     responses:
 *       200:
 *         description: Video uploaded Successfully
 *       500:
 *         description: Server is allocated at the moment
 */
router.post(
  "/video",
  authMiddleware,
  upload.single("video"),
  uploadVideo,
  multerErrorHandler
);

export default router;

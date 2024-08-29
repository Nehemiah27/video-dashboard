import express from "express";
import {
  createUserController,
  updateUser,
  usersSearch,
  userVideos,
} from "../controllers/usersController.js";
import { userSchema } from "../validations/createUserValidation.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { userSearchSchema } from "../validations/userSearchValidation.js";
import { userUpdateSchema } from "../validations/userUpdateValidation.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/create-user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Seerapu"
 *               lastName:
 *                 type: string
 *                 example: "Nehemiah"
 *               email:
 *                 type: string
 *                 example: "seerapu.nehemiah@testing.com"
 *               phone:
 *                 type: string
 *                 example: "8885172580"
 *     responses:
 *       200:
 *         description: User Created Successfully & credentials mailed
 *       400:
 *         description: Bad request
 *       409:
 *         description: Duplicate User found to create
 *       500:
 *         description: Server error
 */
router.post("/create-user", validateRequest(userSchema), createUserController);

/**
 * @swagger
 * /api/users/update-user:
 *   post:
 *     summary: Update User
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userAvatar:
 *                 type: string
 *                 example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
 *               userBio:
 *                 type: string
 *                 example: "I am a Backend Engineer"
 *               firstName:
 *                 type: string
 *                 example: "Seerapu"
 *     responses:
 *       200:
 *         description: Users Data Updated Successfully
 *       401:
 *         description: Token Expired & Unauthorized
 */
router.post(
  "/update-user",
  authMiddleware,
  validateRequest(userUpdateSchema),
  updateUser
);

/**
 * @swagger
 * /api/users/search-users:
 *   post:
 *     summary: Search Users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPage:
 *                 type: number
 *                 example: 1
 *               totalRecordsPerPage:
 *                 type: number
 *                 example: 10
 *               searchText:
 *                 type: string
 *                 example: "Seerapu"
 *     responses:
 *       200:
 *         description: Users Data fetched succesfully
 *       401:
 *         description: Token Expired & Unauthorized
 */
router.post(
  "/search-users",
  authMiddleware,
  validateRequest(userSearchSchema),
  usersSearch
);

/**
 * @swagger
 * /api/users/user-videos/{userID}:
 *   get:
 *     summary: Get all the user Videos
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users Data fetched succesfully
 *       401:
 *         description: Token Expired & Unauthorized
 */
router.get("/user-videos/:userID", authMiddleware, userVideos);

export default router;

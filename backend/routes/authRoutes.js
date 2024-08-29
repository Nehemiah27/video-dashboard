import express from "express";
import { loginUser } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { loginSchema } from "../validations/loginValidation.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login of the User
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Seerapu"
 *               password:
 *                 type: string
 *                 example: "p8UEA825"
 *     responses:
 *       200:
 *         description: User Authenticated Successfully
 *       401:
 *         description: Incorrect password provided
 *       404:
 *         description: User not found with the email given
 *       412:
 *         description: User hasn't set his password yet
 *       500:
 *         description: Server is allocated at the moment
 */
router.post("/login", validateRequest(loginSchema), loginUser);

export default router;

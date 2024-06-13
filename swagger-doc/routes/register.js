/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - password-check
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *         password-check:
 *           type: string
 *       example:
 *         email: 'user@example.com'
 *         password: 'password123'
 *         password-check: 'password123'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing
 *   description: The Invoice management service (Authentication)
 * /register:
 *   post:
 *     summary: Logs registered user into the website
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       400:
 *         description: Invalid Email or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid Email or password
 *       402:
 *         description: Passwords do not match
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Passwords do not match
 *       500:
 *         description: Some server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Please try again later
 */

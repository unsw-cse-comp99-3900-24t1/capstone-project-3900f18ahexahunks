/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *       example:
 *         email: 'user@example.com'
 *         password: 'password123'
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /login:
 *   post:
 *     summary: Logs registered user into the website
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       400:
 *         description: Invalid Email or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid Email or password
 *       500:
 *         description: Some server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Please try again later
 */

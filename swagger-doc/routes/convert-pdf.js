// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Convert PDF to UBL:
//  *       type: object
//  *       required:
//  *         - email
//  *         - password
//  *         - password-check
//  *       properties:
//  *         email:
//  *           type: string
//  *           description: The email of the user
//  *         password:
//  *           type: string
//  *         password-check:
//  *           type: string
//  *       example:
//  *         email: 'user@example.com'
//  *         password: 'password123'
//  *         password-check: 'password123'
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: PDF Management
//  *   description: Convert PDF to UBL
//  * /upload:
//  *   name: Convert PDF to UBL
//  *   tags: [Upload]
//  *   post:
//  *     summary: Upload a PDF file
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               file:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       200:
//  *         description: File uploaded successfully
//  *       400:
//  *         description: Invalid request
//  *       500:
//  *         description: Internal server error
//  */

/**
 * @swagger
 * components:
 *   schemas:
 *     ConvertPdfToUbl:
 *       type: object
 *       required:
 *         - PDF
 *       properties:
 *         PDF:
 *           type: string
 *           format: binary
 *           description: The PDF file to convert
 *       example:
 *         PDF: 'Binary string of the PDF file'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteUblPdf:
 *       type: object
 *       required:
 *         - UBL-id
 *         - PDF-id
 *       properties:
 *         UBL-id:
 *           type: string
 *           description: The ID of the UBL to delete
 *         PDF-id:
 *           type: string
 *           description: The ID of the PDF to delete
 *       example:
 *         UBL-id: '123'
 *         PDF-id: '456'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (PDF Handling)
 *   description: The Invoice management service (Conversion)
 * /convert-pdf-to-ubl:
 *   post:
 *     summary: Convert PDF to UBL
 *     tags: [E-invoicing (PDF Handling)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/octet-stream:
 *           schema:
 *             $ref: '#/components/schemas/ConvertPdfToUbl'
 *     responses:
 *       200:
 *         description: Successful conversion
 *         content:
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 UBL:
 *                   type: string
 *                   format: xml
 *                 UBL-id:
 *                   type: string
 *                 PDF-id:
 *                   type: string
 *       400:
 *         description: Insufficient data in the PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Insufficient data in the PDF, please add more information
 *                 requiredInformation:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Failed to convert PDF to UBL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to convert PDF to UBL
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error, please try again later
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (PDF Handling)
 *   description: The Invoice management service (Deletion)
 * /delete-ubl:
 *   delete:
 *     summary: Delete UBL and PDF
 *     tags: [E-invoicing (PDF Handling)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteUblPdf'
 *     responses:
 *       200:
 *         description: Successfully deleted UBL and PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UBL-id:
 *                   type: string
 *                   example: '123'
 *                 PDF-id:
 *                   type: string
 *                   example: '456'
 *                 message:
 *                   type: string
 *                   example: Successfully deleted UBL and PDF
 *       400:
 *         description: Bad request errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ["UBL Id does not exist", "PDF Id does not exist", "Unable to delete UBL"]
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 'As errors'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error, please try again later
 */

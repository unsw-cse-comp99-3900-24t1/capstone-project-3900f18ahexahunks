const multer = require('multer');
const xml2js = require('xml2js');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');
const { validateUBL } = require('./validation');
const { connectDB, getBucket } = require('./utils');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleFileUpload = upload.fields([{ name: 'xml' }, { name: 'pdf' }]);

const handleFileUploadHandler = async (req, res) => {
    const files = req.files;
    if (!files || !files.xml || !files.pdf) {
        return res.status(400).send('Both XML and PDF files are required.');
    }

    await connectDB();
    const bucket = getBucket();

    const xmlUploadStream = bucket.openUploadStream(files.xml[0].originalname);
    const pdfUploadStream = bucket.openUploadStream(files.pdf[0].originalname);

    xmlUploadStream.end(files.xml[0].buffer);
    pdfUploadStream.end(files.pdf[0].buffer);

    console.log('Files uploaded successfully.');
    res.status(200).send('Files uploaded successfully.');
};

const validateUBLFile = upload.single('file');

const validateUBLFileHandler = async (req, res) => {
    const fileData = req.file.buffer.toString();
    const fileName = req.file.originalname;
    xml2js.parseString(fileData, { explicitArray: false }, async (err, result) => {
        if (err) {
            return res.status(400).json({ error: 'Invalid XML format' });
        }
        try {
            const validationResults = validateUBL(fileData, fileName);
            // Generate PDF report
            const pdfContent = JSON.stringify(validationResults, null, 2);
            pdf.create(pdfContent).toBuffer(async (err, buffer) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to create PDF' });
                }

                // Save PDF to MongoDB
                await connectDB();
                const bucket = getBucket();
                const uploadStream = bucket.openUploadStream(`${fileName}_Validation_Report.pdf`);
                uploadStream.end(buffer);

                // Save PDF to file system
                const pdfFilePath = path.join(__dirname, `${fileName}_Validation_Report.pdf`);
                fs.writeFileSync(pdfFilePath, buffer);

                res.status(200).json({ validationResults, pdfBuffer: buffer.toString('base64') });
            });
        } catch (error) {
            console.error('Error during UBL validation:', error);
            res.status(500).json({ error: 'Validation failed due to internal error' });
        }
    });
};

const rerunValidation = async (req, res) => {
    const { UBLid } = req.body;
    await connectDB();
    const bucket = getBucket();

    const downloadStream = bucket.openDownloadStream(new ObjectId(UBLid));
    let fileData = '';

    downloadStream.on('data', (chunk) => {
        fileData += chunk;
    });

    downloadStream.on('error', (err) => {
        res.status(404).send('File not found.');
    });

    downloadStream.on('end', async () => {
        xml2js.parseString(fileData, { explicitArray: false }, async (err, result) => {
            if (err) {
                return res.status(400).json({ error: 'Invalid XML format' });
            }
            try {
                const validationResults = validateUBL(fileData);
                validationResults.fileDetails.fileName = result.Invoice ? result.Invoice.ID : 'Unknown';
                validationResults.fileDetails.submissionDate = result.Invoice ? result.Invoice.IssueDate : 'Unknown';
                validationResults.fileDetails.checkedBy = 'DB_CEO_TC';
                validationResults.reportGeneratedBy = 'DB_CEO_TC';
                validationResults.reportDate = new Date().toISOString().split('T')[0];

                // Generate PDF report
                const pdfContent = JSON.stringify(validationResults, null, 2);
                pdf.create(pdfContent).toBuffer(async (err, buffer) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to create PDF' });
                    }

                    // Save PDF to MongoDB
                    const uploadStream = bucket.openUploadStream(`${UBLid}_Validation_Report.pdf`);
                    uploadStream.end(buffer);

                    // Save PDF to file system
                    const pdfFilePath = path.join(__dirname, `${UBLid}_Validation_Report.pdf`);
                    fs.writeFileSync(pdfFilePath, buffer);

                    res.status(200).json({ validationResults, pdfBuffer: buffer.toString('base64') });
                });
            } catch (error) {
                console.error('Error during UBL validation:', error);
                res.status(500).json({ error: 'Validation failed due to internal error' });
            }
        });
    });
};

const getValidationReport = async (req, res) => {
    const { type, id } = req.params;
    console.log(`Received request for type: ${type}, id: ${id}`);
    await connectDB();
    const bucket = getBucket();

    try {
        const file = await bucket.find({ _id: new ObjectId(id) }).toArray();
        if (file.length === 0) {
            console.error('File not found in the database.');
            return res.status(404).json({ error: 'File not found.' });
        }

        const { filename, uploadDate } = file[0];

        const downloadStream = bucket.openDownloadStream(new ObjectId(id));
        let fileData = [];

        downloadStream.on('data', (chunk) => {
            console.log('Reading chunk of size:', chunk.length);
            fileData.push(chunk);
        });

        downloadStream.on('error', (err) => {
            console.error('Download stream error:', err);
            res.status(404).send('File not found.');
        });

        downloadStream.on('end', () => {
            console.log('Download stream ended');
            const buffer = Buffer.concat(fileData);
            console.log('Total buffer length:', buffer.length);

            if (type === 'ubl') {
                xml2js.parseString(buffer.toString(), { explicitArray: false }, (err, result) => {
                    if (err) {
                        console.error('XML parse error:', err);
                        return res.status(400).json({ error: 'Invalid XML format' });
                    }
                    try {
                        console.log('Parsed XML:', result);
                        const validationResults = validateUBL(buffer.toString(), filename);
                        validationResults.fileDetails.fileName = filename;
                        validationResults.fileDetails.submissionDate = uploadDate.toISOString();
                        res.status(200).json({ validationResults });
                    } catch (error) {
                        console.error('Error during UBL validation:', error);
                        res.status(500).json({ error: 'Validation failed due to internal error' });
                    }
                });
            } else if (type === 'pdf') {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
                res.status(200).send(buffer);
            } else {
                res.status(400).json({ error: 'Unsupported file type' });
            }
        });
    } catch (error) {
        console.error('Error in processing request:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { handleFileUpload, handleFileUploadHandler, validateUBLFile, validateUBLFileHandler, rerunValidation, getValidationReport };

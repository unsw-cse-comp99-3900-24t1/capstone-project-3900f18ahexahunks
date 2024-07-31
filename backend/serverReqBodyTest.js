const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to check userId validity
const validateUserId = (req, res, next) => {
  console.log('Inside validateUserId middleware');
  console.log('Request body:', req.body);
  const userId = req.body.userId;
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }
  next();
};

// Test endpoint for file upload with userId
app.post('/test-upload', upload.single('file'), validateUserId, (req, res) => {
  console.log('Inside test-upload handler');
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  if (!req.file) {
    return res.status(400).json({ error: 'File is required' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    userId: req.body.userId,
    filename: req.file.originalname,
  });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
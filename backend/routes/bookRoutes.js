const express = require('express');
const router = express.Router();
const multer = require('multer')
const authenticateJWT = require('../middleware/authMiddleware');
const { bookController } = require('../controller');
const upload = multer({ dest: './uploads' })
const uploadmiddleware = upload.fields([{ name: 'image' }])

router.post('/book', authenticateJWT, uploadmiddleware, bookController.addBook);
router.get('/book', authenticateJWT, bookController.fetchAllbooks);
router.get('/book/home', bookController.fetchhomebooks);
router.put('/book', authenticateJWT, bookController.updateBook);
router.delete('/book', authenticateJWT, bookController.deleteBook);

module.exports = router;

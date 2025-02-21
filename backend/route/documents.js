const express = require('express');
const { uploadDocument, getDocuments, removeDocument, downloadDocument } = require('../controller/documents');

const router = express.Router();

router.post('/upload/:userId', uploadDocument);
router.get('/documents/:userId', getDocuments);
router.delete('/documents/:documentId', removeDocument);
router.get('/download/:documentId', downloadDocument);

module.exports = router;

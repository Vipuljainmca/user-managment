const express = require('express');
const multer = require('multer');
const Document = require('../models/documents');
const path = require('path');
const fs = require('fs');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
});


exports.uploadDocument = [
  upload.single('file'),
  async (req, res) => {
    console.log('File Upload Request:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const userId = req.params.userId;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const existingDocuments = await Document.find({ userId });

      for (const doc of existingDocuments) {
        try {
          fs.unlinkSync(path.resolve(doc.path));
        } catch (err) {
          console.warn(`Failed to delete file: ${doc.path}`, err);
        }
      }

      await Document.deleteMany({ userId });

      const newDocument = new Document({
        userId,
        name: req.file.originalname,
        path: req.file.path,
      });

      await newDocument.save();

      return res.status(201).json(newDocument);
    } catch (error) {
      console.error('Error processing document upload:', error);
      return res.status(500).json({ message: 'Error uploading document', error });
    }
  },
];

exports.getDocuments = async (req, res) => {
  try {
    const { userId } = req.params;
    const documents = await Document.find({ userId });

    if (!documents.length) {
      return res.status(404).json({ message: 'No documents found' });
    }

    return res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).json({ message: 'Error fetching documents', error });
  }
};

exports.removeDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    fs.unlink(document.path, async (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ message: 'Error deleting file', err });
      }

      await Document.findByIdAndDelete(documentId);
      return res.json({ message: 'Document deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({ message: 'Error deleting document', error });
  }
};

exports.downloadDocument = async (req, res) => {
    try {
      const { documentId } = req.params;
      const document = await Document.findById(documentId);
  
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      const filePath = path.join(__dirname, "../", document.path);
  
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found on server" });
      }
  
      res.download(filePath, document.name);
    } catch (error) {
      res.status(500).json({ message: "Error downloading document", error });
    }
  };


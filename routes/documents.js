const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find().sort({ lastModified: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific document
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new document
router.post('/', async (req, res) => {
  try {
    const document = new Document({
      _id: req.body.id || new mongoose.Types.ObjectId().toString(),
      title: req.body.title || 'Untitled Document',
      content: req.body.content || ''
    });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// Route to search quotes by author
router.get('/', quoteController.searchQuotesByAuthor);

module.exports = router;

const express = require('express');
const cors = require('cors');
const https = require('https');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const agent = new https.Agent({  
    rejectUnauthorized: false 
});

const quoteController = require('./controllers/quoteController');

// Endpoint to get a random quote
app.get('/api/quotes/random', quoteController.getRandomQuote);

// Endpoint to search quotes by author
app.get('/api/quotes/search', quoteController.searchQuotesByAuthor);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

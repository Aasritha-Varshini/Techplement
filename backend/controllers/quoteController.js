const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');

const agent = new https.Agent({  
    rejectUnauthorized: false 
});

// Random Quote from API
const getRandomQuote = async (req, res) => {
    try {
        console.log('Fetching quotes from Forismatic API...');

        const response = await axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', { httpsAgent: agent });
        const quote = response.data;

        if (!quote || !quote.quoteText) {
            console.error('Quote data is missing required fields');
            return res.status(500).json({ error: 'Quote data is missing required fields' });
        }

        res.json({
            quote: quote.quoteText,
            author: quote.quoteAuthor || 'Unknown'
        });
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchQuotesByAuthor = (req, res) => {
    try {
        const { author } = req.query;
        if (!author) {
            return res.status(400).json({ error: 'Author query parameter is required' });
        }

        const filePath = path.join(__dirname, '..', 'data', 'quotes.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const staticQuotes = JSON.parse(fileData);

        const filteredQuotes = staticQuotes.filter(q => q.author.toLowerCase() === author.toLowerCase());

        if (filteredQuotes.length > 0) {
            res.json(filteredQuotes);
        } else {
            res.status(404).json({ message: 'No quotes found for the specified author' });
        }
    } catch (error) {
        console.error('Error searching quotes by author:', error);
        res.status(500).json({ message: 'Error searching quotes by author', error });
    }
};

module.exports = { getRandomQuote, searchQuotesByAuthor };

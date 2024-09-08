document.addEventListener('DOMContentLoaded', () => {
    const randomQuoteButton = document.getElementById('get-quote');
    const searchButton = document.getElementById('search-author-btn');
    const authorInput = document.getElementById('author');
    const quoteDisplay = document.getElementById('quote');
    const authorDisplay = document.getElementById('author-display');
    const searchResults = document.getElementById('search-results');

    // Function to fetch a random quote from the API
    async function fetchRandomQuote() {
        try {
            const response = await fetch('http://localhost:5000/api/quotes/random');
            const quote = await response.json();

            console.log('Random Quote:', quote); // Debugging line

            quoteDisplay.textContent = `"${quote.quote || 'No text available'}"`;
            authorDisplay.textContent = `- ${quote.author || 'Unknown'}`;
        } catch (error) {
            console.error('Error fetching random quote:', error);
            quoteDisplay.textContent = 'Error fetching quote';
            authorDisplay.textContent = '';
        }
    }

    // Function to search for quotes by author from local file
    async function searchStaticQuotes() {
        const author = authorInput.value.trim(); // Get trimmed value
        if (!author) {
            alert('Please enter an author name.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/quotes/search?author=${encodeURIComponent(author)}`);
            const quotes = await response.json();

            console.log('Search Results:', quotes); // Debugging line

            searchResults.innerHTML = ''; // Clear previous results
            if (Array.isArray(quotes) && quotes.length > 0) {
                quotes.forEach(quote => {
                    const li = document.createElement('li');
                    li.textContent = `"${quote.quote || 'No text available'}" - ${quote.author || 'Unknown'}`;
                    searchResults.appendChild(li);
                });
            } else {
                searchResults.innerHTML = '<li>No quotes found</li>';
            }
        } catch (error) {
            console.error('Error fetching quotes:', error);
            searchResults.innerHTML = '<li>Error fetching quotes</li>';
        }
    }

    // Event listeners
    randomQuoteButton.addEventListener('click', fetchRandomQuote);
    searchButton.addEventListener('click', searchStaticQuotes);
});

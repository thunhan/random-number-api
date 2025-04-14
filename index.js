const express = require('express');
const bodyParser = require('body-parser');
const { initializePool, generateRandomNumbers } = require('./randomNumberService');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// API endpoint: POST /random-numbers
app.post('/random-numbers', (req, res) => {
    const { n, min = 0, max = 999, replacement = true } = req.body;

    if (isNaN(n) || n <= 0) {
        return res.status(400).json({ error: 'Invalid parameter: n must be a positive integer.' });
    }

    if (min >= max) {
        return res.status(400).json({ error: 'Invalid range: min must be less than max.' });
    }

    try {
        const randomNumbers = generateRandomNumbers(n, min, max, replacement);
        res.json({ randomNumbers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Random Number Pool API is running on http://localhost:${PORT}`);
    initializePool();
});
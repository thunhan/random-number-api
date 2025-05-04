const express = require('express');
const bodyParser = require('body-parser');
const { initializePool, generateRandomNumbers } = require('./randomNumberService');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Add a fallback to handle undefined req.body
app.use((req, res, next) => {
    if (!req.body) {
        req.body = {};
    }
    next();
});

// Middleware to check API key
app.use((req, res, next) => {
    const { apiKey } = req.body;
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return res.status(403).json({ error: 'Forbidden: Invalid or missing API key.' });
    }

    next();
});

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

app.get('/', (req, res) => {
    res.send('API is running...');
  });

// Start server
app.listen(PORT, () => {
    console.log(`Random Number Pool API is running on http://localhost:${PORT}`);
    initializePool();
});
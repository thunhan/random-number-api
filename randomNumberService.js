const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const POOL_SIZE = 260_000; // Equivalent to one archived .bin file of 1 MB file size
const RANDOM_NUMBERS_FILE = path.join(__dirname, 'random.org-pregenerated-2025-04-bin', '2025-04-14.bin');

let randomNumberPool = [];

// Helper function to load random numbers from binary file
function loadRandomNumbers() {
    const buffer = fs.readFileSync(RANDOM_NUMBERS_FILE);
    const numbers = [];

    for (let i = 0; i < buffer.length; i += 4) {
        numbers.push(buffer.readUInt32BE(i));
    }

    return numbers;
}

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomBytes = crypto.randomBytes(4);
        const randomValue = randomBytes.readUInt32BE(0);
        const j = randomValue % (i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize pool on startup
function initializePool() {
    const numbers = loadRandomNumbers();
    randomNumberPool = numbers.slice(0, POOL_SIZE);
    shuffle(randomNumberPool);
}

// Generate random numbers
function generateRandomNumbers(n, min, max, replacement) {
    if (replacement) {
        return Array.from({ length: n }, () => {
            const randomIndex = Math.floor(Math.random() * randomNumberPool.length);
            return Math.floor(min + (randomNumberPool[randomIndex] % (max - min + 1)));
        });
    } else {
        if (n > randomNumberPool.length) {
            throw new Error('Not enough unique numbers available in the pool.');
        }

        const result = [];
        const usedIndices = new Set();

        while (result.length < n) {
            const randomIndex = Math.floor(Math.random() * randomNumberPool.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                result.push(Math.floor(min + (randomNumberPool[randomIndex] % (max - min + 1))));
            }
        }

        return result;
    }
}

module.exports = {
    initializePool,
    generateRandomNumbers
};
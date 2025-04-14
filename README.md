# Random Number Pool API

This project provides a random number generation service using a pre-generated pool of random numbers. The pool is initialized from a archive binary file from RANDOM.ORG and supports generating random numbers with or without replacement.

## Features

- Load random numbers from a binary file.
- Generate random numbers within a specified range.
- Support for generating numbers with or without replacement. If `true`, the resulting numbers may contain duplicates. If `false`, the numbers will be unique.

## Project Structure

- `index.js`: Entry point for the application.
- `randomNumberService.js`: Core logic for loading, shuffling, and generating random numbers.
- `docs/`: Documentation folder.
- `random.org-pregenerated-2025-04-bin/`: Folder containing pre-generated random number binary files.

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Ensure the binary file (`2025-04-14.bin`) is present in the `random.org-pregenerated-2025-04-bin/` folder.

## License

This project is licensed under the MIT License.

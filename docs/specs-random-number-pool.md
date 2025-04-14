# Random Number Pool API Specification

## Overview
This API microservice is designed to generate and manage a pool of random numbers for various lottery and gaming purposes. The random numbers are sourced from binary files located in the `/random.org-pregenerated-2025-04-bin` folder. Each file corresponds to a specific date and contains pre-generated random numbers. The API will read these numbers sequentially to populate the pools. The pool will contain 1 million random numbers, which can be used for different lottery types or dice rolls. The numbers in the pool will be shuffled randomly to ensure unbiased distribution.

---

## API Endpoints

- **GET /random-numbers**
  - **Description**: Retrieve a set of random numbers from the pool.
  - **Parameters**:
    - `n` (integer, required): The number of random numbers to retrieve.
    - `min` (integer, optional, default: 0): The minimum value of the random numbers.
    - `max` (integer, optional, default: 999): The maximum value of the random numbers.
    - `replacement` (boolean, optional, default: true): Specifies whether the random numbers should be picked with replacement. If `true`, the resulting numbers may contain duplicates. If `false`, the numbers will be unique.

---

## Implementation Notes
1. **Random Number Source**: The random numbers are now sourced from binary files located in the `/random.org-pregenerated-2025-01-bin` folder. Each file corresponds to a specific date and contains pre-generated random numbers. The API will read these numbers sequentially to populate the pools.
2. **Random Shuffling**: After generating the pool, the numbers will be shuffled randomly to ensure unbiased distribution.
3. **Pool Storage**: Pools will be stored in memory or a database, depending on the deployment configuration.
4. **Concurrency**: Ensure thread-safe access to the pools for concurrent requests.
5. **Error Handling**: Proper error messages and HTTP status codes will be returned for invalid requests or server errors.
6. **Startup Pool Creation**: When the API service starts, a pool of random numbers will be created automatically.

---

## Future Enhancements
- Add support for custom lottery types with user-defined ranges.
- Implement rate limiting to prevent abuse of the API.
- Provide an option to export pools to a file for offline use.
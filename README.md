# ThirtyFour

A flexible logging utility for Node.js applications with console and file logging capabilities.

## Features

- 🌈 Colorful console logging with different log levels (info, warn, error, success)
- 📝 Optional file logging with daily log rotation
- 🧹 Automatic cleanup of old log files (7-day retention)
- 🌐 Express middleware for HTTP request logging
- 🔄 Works with both ES Modules and CommonJS projects
- 🔍 Automatic file path detection for error logs

## Installation

```bash
npm install thirtyfour
```

## Usage

### Basic Usage

```javascript
// ES Modules
import logger from "thirtyfour";

// CommonJS
// const logger = require('thirtyfour');

// Log messages with different levels
logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
logger.success("This is a success message");
```

### Enable File Logging

Set the environment variable `ENABLE_FILE_LOGGING` to "true" before importing the logger:

```javascript
// Set environment variable
process.env.ENABLE_FILE_LOGGING = "true";

// Import logger
import logger from "thirtyfour";

// Logs will be saved to ./logs/log-YYYY-MM-DD.txt
logger.info("This will be logged to file");
```

### HTTP Request Logging

```javascript
import express from "express";
import logger, { logRequest } from "thirtyfour";

const app = express();

// Add request logging middleware
app.use(logRequest);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  logger.success("Server started on port 3000");
});
```

## Log Format

The logger uses the following format for different log types:

```
[INFO] [April 12, 2025 21:12:07]: This is a text info message.
[WARN] [April 12, 2025 21:12:07]: This is a text warning message.
[ERROR] [April 12, 2025 21:12:07]: /path/to/file.js
This is an Error Message
[SUCCESS] [April 12, 2025 21:12:07]: This is a text success message.
[API] [April 12, 2025 21:12:07]: HTTP(200) GET /api/users
```

## Configuration

### Environment Variables

- `ENABLE_FILE_LOGGING`: Set to "true" to enable logging to files (default: false)

### Log File Location

Logs are stored in the `./logs` directory relative to your application's current working directory.

### Log Retention

Log files are automatically deleted after 7 days.

## API Reference

### Logger Methods

- `logger.info(message)`: Log an informational message
- `logger.warn(message)`: Log a warning message
- `logger.error(message)`: Log an error message with caller file path
- `logger.success(message)`: Log a success message

### Middleware

- `logRequest`: Express middleware for HTTP request logging

## License

ISC

## Author

Harsh Prajapat, s.harshprajapat@gmail.com

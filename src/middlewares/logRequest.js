// src/middlewares/logRequest.js
import { getTimestamp } from "../utils/dateUtils.js";
import { colors } from "../utils/chalkUtils.js";
import { logToFile } from "../logFileUtility/fileLogger.js";

/**
 * Get color function based on HTTP status code
 * @param {number} statusCode - HTTP status code
 * @returns {Function} Color function
 */
function getStatusColor(statusCode) {
  if (statusCode >= 500) return colors.red;
  if (statusCode >= 400) return colors.yellow;
  if (statusCode >= 300) return colors.cyan;
  if (statusCode >= 200) return colors.green;
  return colors.blue;
}

/**
 * Express middleware to log HTTP requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function logRequest(req, res, next) {
  // Store original end method
  const originalEnd = res.end;

  // Override end method to capture and log when request completes
  res.end = function (chunk, encoding) {
    // Restore original end method
    res.end = originalEnd;

    // Call original end method
    res.end(chunk, encoding);

    // Log request details
    const timestamp = getTimestamp();
    const method = req.method;
    const path = req.originalUrl || req.url;
    const status = res.statusCode;

    const prefix = colors.magenta(`[API] [${timestamp}]`);
    const color = getStatusColor(status);
    const httpInfo = color(`HTTP(${status}) ${method} ${path}`);

    console.log(`${prefix}: ${httpInfo}`);

    // Log to file if enabled
    if (process.env.ENABLE_FILE_LOGGING === "true") {
      logToFile(`[API] [${timestamp}]: HTTP(${status}) ${method} ${path}`);
    }
  };

  next();
}

// Export as default
export default logRequest;

// CommonJS compatibility
if (typeof module !== "undefined") {
  module.exports = logRequest;
}

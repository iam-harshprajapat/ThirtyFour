// src/core/Logger.js
import { getTimestamp } from "../utils/dateUtils.js";
import { colors } from "../utils/chalkUtils.js";
import { logToFile } from "../logFileUtility/fileLogger.js";
import { getCallerFilePath } from "../utils/callerFilePath.js";

/**
 * Main Logger class for console and file logging
 */
class Logger {
  /**
   * Creates a new Logger instance
   */
  constructor() {
    this.isFileLoggingEnabled = process.env.ENABLE_FILE_LOGGING === "true";
  }

  /**
   * Log informational message
   * @param {string} message - Message to log
   */
  info(message) {
    const timestamp = getTimestamp();
    const prefix = colors.blue(`[INFO] [${timestamp}]`);
    console.log(`${prefix}: ${message}`);
    this.logToFileIfNeeded(`[INFO] [${timestamp}]: ${message}`);
  }

  /**
   * Log warning message
   * @param {string} message - Message to log
   */
  warn(message) {
    const timestamp = getTimestamp();
    const prefix = colors.yellow(`[WARN] [${timestamp}]`);
    console.log(`${prefix}: ${message}`);
    this.logToFileIfNeeded(`[WARN] [${timestamp}]: ${message}`);
  }

  /**
   * Log error message with caller file path
   * @param {string} message - Error message to log
   */
  error(message) {
    const callerFilePath = getCallerFilePath();
    const timestamp = getTimestamp();

    const errorHeader = colors.red(`[ERROR] [${timestamp}]:`);
    const fileInfo = colors.yellow(`affected file ${callerFilePath}`);
    const errorMessage = colors.red(message);

    console.log(`${errorHeader} ${fileInfo}\n${errorMessage}`);
    this.logToFileIfNeeded(
      `[ERROR] [${timestamp}]: ${callerFilePath}\n${message}`
    );
  }

  /**
   * Log success message
   * @param {string} message - Message to log
   */
  success(message) {
    const timestamp = getTimestamp();
    const prefix = colors.green(`[SUCCESS] [${timestamp}]`);
    console.log(`${prefix}: ${message}`);
    this.logToFileIfNeeded(`[SUCCESS] [${timestamp}]: ${message}`);
  }

  /**
   * Helper method to log to file if enabled
   * @private
   * @param {string} message - Message to log to file
   */
  logToFileIfNeeded(message) {
    if (this.isFileLoggingEnabled) {
      logToFile(message);
    }
  }
}

// Create singleton instance
const logger = new Logger();

// Export as default for ESM
export default logger;

// CommonJS compatibility
if (typeof module !== "undefined") {
  module.exports = logger;
}

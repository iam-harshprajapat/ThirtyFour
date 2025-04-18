// src/core/Logger.js
import { getTimestamp } from "../utils/dateUtils.js";
import { colors } from "../utils/chalkUtils.js";
import { logToFile } from "../logFileUtility/fileLogger.js";
import { getCallerFilePath } from "../utils/callerFilePath.js";

class Logger {
  /**
   * Creates a new Logger instance
   */
  constructor() {
    this.isFileLoggingEnabled = process.env.ENABLE_FILE_LOGGING === "true";
  }

  /**
   * Log informational message
   * @param {...any} args - Messages or objects to log
   */
  info(...args) {
    const timestamp = getTimestamp();
    const prefix = colors.blue(`[INFO] [${timestamp}]`);
    console.log(`${prefix}:`, ...args);
    this.logToFileIfNeeded(
      `[INFO] [${timestamp}]: ${this.formatArgsForFile(args)}`
    );
  }

  /**
   * Log warning message
   * @param {...any} args - Messages or objects to log
   */
  warn(...args) {
    const timestamp = getTimestamp();
    const prefix = colors.yellow(`[WARN] [${timestamp}]`);
    console.log(`${prefix}:`, ...args);
    this.logToFileIfNeeded(
      `[WARN] [${timestamp}]: ${this.formatArgsForFile(args)}`
    );
  }

  /**
   * Log error message with caller file path
   * @param {...any} args - Error messages or objects to log
   */
  error(...args) {
    const callerFilePath = getCallerFilePath();
    const timestamp = getTimestamp();

    const errorHeader = colors.red(`[ERROR] [${timestamp}]:`);
    const fileInfo = colors.yellow(`affected file ${callerFilePath}`);

    console.log(`${errorHeader} ${fileInfo}`);
    args.forEach((arg) => {
      if (typeof arg === "object" && arg instanceof Error) {
        console.log(colors.red(arg.message));
        if (arg.stack) console.log(colors.gray(arg.stack));
      } else if (typeof arg === "object") {
        console.log(colors.red(JSON.stringify(arg, null, 2)));
      } else {
        console.log(colors.red(arg));
      }
    });

    this.logToFileIfNeeded(
      `[ERROR] [${timestamp}]: ${callerFilePath}\n${this.formatArgsForFile(
        args,
        true
      )}`
    );
  }

  /**
   * Log success message
   * @param {...any} args - Messages or objects to log
   */
  success(...args) {
    const timestamp = getTimestamp();
    const prefix = colors.green(`[SUCCESS] [${timestamp}]`);
    console.log(`${prefix}:`, ...args);
    this.logToFileIfNeeded(
      `[SUCCESS] [${timestamp}]: ${this.formatArgsForFile(args)}`
    );
  }

  /**
   * Format arguments for file logging
   * @private
   * @param {Array} args - Arguments to format
   * @param {boolean} isError - Whether this is for error logging
   * @returns {string} Formatted string
   */
  formatArgsForFile(args, isError = false) {
    return args
      .map((arg) => {
        if (arg instanceof Error) {
          return `${arg.message}\n${arg.stack || ""}`;
        } else if (typeof arg === "object") {
          try {
            return JSON.stringify(arg, null, isError ? 2 : 0);
          } catch (e) {
            return "[Circular Object]";
          }
        } else {
          return String(arg);
        }
      })
      .join(isError ? "\n" : " ");
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

// src/logFileUtility/fileLogger.js
import fs from "fs";
import path from "path";
import { getTimestamp } from "../utils/dateUtils.js";

// Constants
const LOG_DIR = "./logs";

/**
 * Ensures log directory exists
 * @returns {string} Absolute path to log directory
 */
function ensureLogDirExists() {
  // Get absolute path to calling application's log directory
  const appLogDir = path.resolve(process.cwd(), LOG_DIR);

  if (!fs.existsSync(appLogDir)) {
    try {
      fs.mkdirSync(appLogDir, { recursive: true });
    } catch (err) {
      console.error(`Failed to create log directory: ${err.message}`);
    }
  }

  return appLogDir;
}

/**
 * Gets log filename for current day
 * @returns {string} Full path to log file
 */
function getLogFileName() {
  const logDir = ensureLogDirExists();
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return path.join(logDir, `log-${formattedDate}.txt`);
}

/**
 * Logs message to file
 * @param {string} message - Message to log
 */
export function logToFile(message) {
  try {
    const logFile = getLogFileName();
    fs.appendFileSync(logFile, message + "\n");
  } catch (err) {
    console.error("Error writing to log file:", err.message);
  }
}

// CommonJS compatibility
if (typeof module !== "undefined") {
  module.exports = { logToFile };
}

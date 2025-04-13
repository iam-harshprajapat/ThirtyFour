// src/logFileUtility/fileDeletion.js
import fs from "fs";
import path from "path";

// Constants
const LOG_DIR = "./logs";
const RETENTION_DAYS = 7;
const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

let deletionInterval = null;

/**
 * Delete log files older than RETENTION_DAYS
 */
export function deleteOldLogs() {
  const now = Date.now();
  const logDir = path.resolve(process.cwd(), LOG_DIR);

  // Skip if log directory doesn't exist
  if (!fs.existsSync(logDir)) {
    return;
  }

  try {
    const files = fs.readdirSync(logDir);

    files.forEach((file) => {
      const filePath = path.join(logDir, file);

      try {
        const stats = fs.statSync(filePath);
        const fileAgeInDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

        if (fileAgeInDays > RETENTION_DAYS) {
          fs.unlinkSync(filePath);
          console.log(`🧹 Deleted old log file: ${file}`);
        }
      } catch (err) {
        console.error(`Error processing file ${file}:`, err.message);
      }
    });
  } catch (err) {
    console.error("Error cleaning up log files:", err.message);
  }
}

/**
 * Initialize log deletion interval
 */
export function initLogDeletion() {
  // Clear any existing interval
  if (deletionInterval) {
    clearInterval(deletionInterval);
  }

  // Run immediately
  deleteOldLogs();

  // Set up interval
  deletionInterval = setInterval(deleteOldLogs, CHECK_INTERVAL_MS);

  // Clean up on process exit
  process.on("exit", () => {
    if (deletionInterval) {
      clearInterval(deletionInterval);
    }
  });
}

// CommonJS compatibility
if (typeof module !== "undefined") {
  module.exports = { deleteOldLogs, initLogDeletion };
}

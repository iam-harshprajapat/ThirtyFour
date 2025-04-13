// src/index.js
import logger from "./core/Logger.js";
import { logToFile } from "./logFileUtility/fileLogger.js";
import { initLogDeletion } from "./logFileUtility/fileDeletion.js";
import logRequest from "./middlewares/logRequest.js";

// Initialize log deletion if file logging is enabled
if (process.env.ENABLE_FILE_LOGGING === "true") {
  initLogDeletion();
}

// Export for ESM
export default logger;
export { logToFile, logRequest };

// CommonJS compatibility
if (typeof module !== "undefined") {
  module.exports = logger;
  module.exports.logToFile = logToFile;
  module.exports.logRequest = logRequest;
}

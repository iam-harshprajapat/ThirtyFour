// src/utils/callerFilePath.js
/**
 * Gets the file path of the caller that invoked the logger
 * @returns {string} File path of the caller
 */
export function getCallerFilePath() {
  // Create error to get stack trace
  const error = new Error();
  const stack = error.stack || "";

  // Split stack into lines
  const stackLines = stack.split("\n");

  // Skip internal entries in the stack
  const excludePatterns = [
    "Logger.js",
    "logger.js",
    "getCallerFilePath",
    "logToFileIfNeeded",
    "at Object.error",
    "at error (",
    "at Function.error",
    "at Module.error",
    "thirtyfour",
    "node:internal",
  ];

  // Find the first line that doesn't match our exclude patterns
  for (let i = 1; i < stackLines.length; i++) {
    const line = stackLines[i].trim();

    // Skip if line matches any exclude pattern
    if (excludePatterns.some((pattern) => line.includes(pattern))) {
      continue;
    }

    // Extract the file path - handles multiple stack trace formats
    const match = line.match(/at\s+.*?\s+\((.*?):\d+:\d+\)|at\s+(.*?):\d+:\d+/);
    if (match) {
      const filePath = (match[1] || match[2] || "").replace(/^file:\/\//, "");
      if (filePath) {
        return filePath;
      }
    }
  }

  return "unknown location";
}

// CommonJS compatibility
if (typeof module !== "undefined") {
  module.exports = { getCallerFilePath };
}

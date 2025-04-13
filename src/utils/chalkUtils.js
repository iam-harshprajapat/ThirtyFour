// src/utils/chalkUtils.js
// Simple ANSI color utility that doesn't depend on chalk

/**
 * Simple color utilities that work without external dependencies
 */
export const colors = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
};

// CommonJS compatibility
if (typeof module !== "undefined") {
  module.exports = { colors };
}

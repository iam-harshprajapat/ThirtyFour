// src/utils/timestamp.js
// Simple fallback implementation
let formatDate = () => {
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
};

// Try to load dayjs without top-level await
let dayjs;
try {
  // For CommonJS
  const dayjsModule = require("dayjs");
  dayjs = dayjsModule.default || dayjsModule;
  formatDate = () => dayjs().format("MMMM D, YYYY HH:mm:ss");
} catch (err) {
  // For ESM
  import("dayjs")
    .then((module) => {
      dayjs = module.default;
      formatDate = () => dayjs().format("MMMM D, YYYY HH:mm:ss");
    })
    .catch(() => {
      // Use fallback implementation if import fails
    });
}

/**
 * Get formatted timestamp string
 * @returns {string} Formatted timestamp in "Month D, YYYY HH:mm:ss" format
 */
export function getTimestamp() {
  return formatDate();
}

// Add CommonJS compatibility
if (typeof module !== "undefined") {
  module.exports = { getTimestamp };
}

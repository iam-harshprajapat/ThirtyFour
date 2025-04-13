// src/utils/dateUtils.js
// Simple date formatting that doesn't depend on dayjs

/**
 * Format a date in the format: "Month D, YYYY HH:mm:ss"
 * @param {Date} date - Date to format (defaults to now)
 * @returns {string} Formatted date string
 */
export function formatDate(date = new Date()) {
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

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Get current timestamp as formatted string
 * @returns {string} Formatted timestamp
 */
export function getTimestamp() {
  return formatDate(new Date());
}

// CommonJS compatibility
if (typeof module !== "undefined") {
  module.exports = { formatDate, getTimestamp };
}

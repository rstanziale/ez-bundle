module.exports = {
  /**
   * Utility to log message with timestamp and level
   * @param {string} message
   * @param {string} level
   */
  logger: (message = "", level = "INFO") => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`);
  },
};

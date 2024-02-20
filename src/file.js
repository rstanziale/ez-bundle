const { readFileSync } = require("fs");
const { logger } = require("./util.js");

/**
 * From JSON object, return a list of flatten keys
 * @param {object} source
 * @param {string[]} list
 * @param {string} extraKey
 * @returns list of keys
 */
flattenJSON = (source = {}, list = [], extraKey = "") => {
  for (const key in source) {
    if (typeof source[key] !== "object") {
      list.push(`${extraKey}${key}`);
    } else {
      flattenJSON(source[key], list, `${extraKey}${key}.`);
    }
  }
  return list;
};

/**
 * Get an object javascript from JSON
 * @param {string} fileName
 * @returns javascript object
 */
readJSON = (fileName) => {
  try {
    let rawdata = readFileSync(fileName);
    return JSON.parse(rawdata);
  } catch (error) {
    logger(error, "ERROR");
  }
};

module.exports = { flattenJSON, readJSON };

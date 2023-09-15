import { createWriteStream, readFileSync } from "fs";
import { execGrep } from "./command.js";
import { logger } from "./util.js";

/**
 * From JSON object, return a list of flatten keys
 * @param {object} source
 * @param {string[]} list
 * @param {string} extraKey
 * @returns list of keys
 */
const flattenJSON = (source = {}, list = [], extraKey = "") => {
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
const readJSON = (fileName) => {
  try {
    let rawdata = readFileSync(fileName);
    return JSON.parse(rawdata);
  } catch (error) {
    logger(error, "ERROR");
  }
};

/**
 * Create file with item list not present in directory target
 * @param {string[]} list
 * @param {string} directoryTarget
 * @param {string} extensions
 */
const createFileWithMissingEntries = (list, directoryTarget, extensions) => {
  logger("Starting process...");
  const stream = createWriteStream("entries-not-used.txt", { flags: "a" });
  try {
    list.forEach((item) => {
      const occurences = execGrep(item, directoryTarget, extensions);
      if (occurences === 0) {
        stream.write(item + "\n");
      }
    });
  } catch (error) {
    logger(error, "ERROR");
  } finally {
    logger("End process!");
    stream.end();
  }
};

export { createFileWithMissingEntries, flattenJSON, readJSON };

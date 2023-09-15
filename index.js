import { argv, exit } from "node:process";
import {
  createFileWithMissingEntries,
  flattenJSON,
  readJSON,
} from "./src/file.js";
import { logger } from "./src/util.js";

// Check bundle argument
const jsonFile = argv[2];
if (!jsonFile) {
  logger("No json file specified", "ERROR");
  exit();
}

// Check directory target argument
const directoryTarget = argv[3];
if (!directoryTarget) {
  logger("No directory target specified", "ERROR");
  exit();
}

// Check file extensions argument
let extensions = argv[4];
if (!extensions) {
  logger("No file extension specified, the default value will be used", "WARN");
  extensions = "ts,html";
}

// Create list of keys to research
const json = readJSON(jsonFile);
const list = flattenJSON(json);
logger(`Number of keys: ${list.length}`);

// Perform research
createFileWithMissingEntries(list, directoryTarget, extensions);

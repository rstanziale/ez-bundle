const { argv, exit } = require("node:process");
const { createWriteStream } = require("fs");
const { execGrep } = require("./src/command.js");
const { flattenJSON, readJSON } = require("./src/file.js");
const { logger } = require("./src/util.js");

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
logger("Starting process...");

const FILE_NAME = "entries-not-used.txt";
const stream = createWriteStream(FILE_NAME, { flags: "w" });

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

const { execSync } = require("node:child_process");

module.exports = {
  /**
   * Accroding searchString and target, excecute grep command to find number of occurences
   * @param {string} searchString
   * @param {string} target
   * @param {string} extensions
   * @returns number of occurences
   */
  execGrep: (searchString, target, extensions) => {
    const includes = extensions
      .split(",")
      .map((e) => `--include \*.${e}`)
      .join(" ");
    const command = `grep -Rnwce ${searchString} ${target} ${includes}`;

    let occurences = 0;

    try {
      const result = execSync(command);
      if (result) {
        occurences = result.toString().trim().split("\n").length;
      }
    } catch {
      // If the command does not find a match
    }

    return occurences;
  },
};

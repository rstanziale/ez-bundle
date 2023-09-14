import { execSync } from "node:child_process";

/**
 * Accroding searchString and target, excecute grep command to find number of occurences
 * @param {string} searchString
 * @param {string} target
 * @returns number of occurences
 */
const execGrep = (searchString, target) => {
    const command = `grep -Rnwce ${searchString} ${target} --include \*.html --include \*.ts`;
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
};

export { execGrep };
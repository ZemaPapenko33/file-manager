import path from "path";
import fs from "fs";
import { printCurrentDir } from "../../utils/print.js";
import { ls } from "./ls.js";

export const cd = async (userInputPath) => {
  const currentPath = process.cwd();
  const newPath = path.resolve(currentPath, userInputPath);
  try {
    await fs.promises.access(newPath, fs.constants.F_OK);
    const parsedPath = path.parse(newPath);
    let isOutOfRoot = false;
    if (process.platform === "win32") {
      isOutOfRoot = !parsedPath.root || !/^[a-zA-Z]:\\/.test(newPath);
    } else if (process.platform === "darwin" || process.platform === "linux") {
      isOutOfRoot = parsedPath.root !== "/";
    }

    if (isOutOfRoot) {
      console.warn("Cannot move outside of the root directory.");
    } else {
      process.chdir(newPath);
      printCurrentDir();
      await ls();
    }
  } catch (error) {
    console.error(error.message);
  }
};

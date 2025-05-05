import fs from "fs";
import path from "path";
import { printCurrentDir } from "../../utils/print.js";

export const rn = async (pathToFile, newName) => {
  try {
    if (!pathToFile || !newName) {
      throw new Error("New name for file is missing");
    }
    const oldPath = path.resolve(process.cwd(), pathToFile);
    const dir = path.dirname(oldPath);
    const newPath = path.join(dir, newName);

    await fs.promises.rename(oldPath, newPath);
    console.log(`Renamed to ${newName}`);
    printCurrentDir();
  } catch (error) {
    console.error(error.message);
  }
};

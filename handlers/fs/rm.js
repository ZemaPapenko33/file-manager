import fs from "fs";
import path from "path";
import { printCurrentDir } from "../../utils/print.js";

export const rm = async (pathToFile) => {
  try {
    if (!pathToFile) throw new Error("Path to file is missing");
    const currentPath = path.resolve(process.cwd(), pathToFile);
    const file = await fs.promises.stat(currentPath);
    if (!file.isFile()) throw new Error("It is not file");
    await fs.promises.unlink(currentPath);
    console.log(`File from ${currentPath} was deleted`);
    printCurrentDir();
  } catch (error) {
    console.error(error.message);
  }
};

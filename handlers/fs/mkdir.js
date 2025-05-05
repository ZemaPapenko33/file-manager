import fs from "fs";
import path from "path";
import { printCurrentDir } from "../../utils/print.js";

export const mkdir = async (dirName) => {
  try {
    if (!dirName) throw new Error("Directory name is missing");
    const currentPath = path.resolve(process.cwd(), dirName);
    await fs.promises.mkdir(currentPath);
    console.log(`Directory '${dirName}' was created`);
    printCurrentDir();
  } catch (error) {
    console.error(error.message);
  }
};

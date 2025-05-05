import fs from "fs";
import path from "path";
import { printCurrentDir } from "../../utils/print.js";

export const add = async (fileName) => {
  try {
    if (!fileName) throw new Error("File name is missing");
    const currentPath = path.resolve(process.cwd(), fileName);
    await fs.promises.writeFile(currentPath, "", { flag: "wx" });
    console.log(`File with name ${fileName} was created`);
    printCurrentDir();
  } catch (error) {
    console.error(error.message);
  }
};

import fs from "fs";
import path from "path";
import { printCurrentDir } from "../../utils/print.js";

export const cp = async (pathToFile, pathToNewFileDir) => {
  try {
    if (!pathToFile || !pathToNewFileDir) {
      throw new Error("Path to file or path to new file directory is missing");
    }

    const sourcePath = path.resolve(process.cwd(), pathToFile);
    const destDir = path.resolve(process.cwd(), pathToNewFileDir);
    const file = await fs.promises.stat(sourcePath);
    const directory = await fs.promises.stat(destDir);

    if (!file.isFile()) throw new Error("Source is not a file");
    if (!directory.isDirectory())
      throw new Error("Destination is not a directory");

    const destPath = path.join(destDir, path.basename(sourcePath));

    const rs = fs.createReadStream(sourcePath);
    const ws = fs.createWriteStream(destPath, { flags: "wx" });

    await new Promise((resolve, reject) => {
      rs.pipe(ws);
      ws.on("finish", resolve);
      rs.on("error", reject);
      ws.on("error", reject);
    });
    printCurrentDir();
  } catch (error) {
    console.error(error.message);
  }
};

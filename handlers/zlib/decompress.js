import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import zlib from "zlib";

export const decompress = async (pathToFile, pathToDes) => {
  try {
    if (!pathToFile || !pathToDes) throw new Error("One of paths is missing");

    const currentPath = path.resolve(process.cwd(), pathToFile);
    const destPath = path.resolve(process.cwd(), pathToDes);

    await fs.promises.access(currentPath, fs.constants.R_OK);

    const rs = fs.createReadStream(currentPath);
    const lib = zlib.createBrotliDecompress();
    const ws = fs.createWriteStream(destPath);

    pipeline(rs, lib, ws, (err) => {
      if (err) {
        console.error("Decompression failed", err);
      } else {
        console.log("File successfully decompressed");
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

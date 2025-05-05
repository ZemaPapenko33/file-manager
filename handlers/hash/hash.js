import fs from "fs";
import path from "path";
import crypto from "crypto";
import { printCurrentDir } from "../../utils/print.js";

export const hash = async (pathToFile) => {
  try {
    if (!pathToFile) {
      throw new Error("Path to file is missing");
    }
    const filePath = path.resolve(process.cwd(), pathToFile);

    await fs.promises.access(filePath, fs.constants.R_OK);

    const rs = fs.createReadStream(filePath);
    const hash = crypto.createHash("sha256");

    rs.on("data", (chunk) => {
      hash.update(chunk);
    });
    rs.on("end", () => {
      console.log(`Hash of the file is: ${hash.digest("hex")}`);
      printCurrentDir();
    });
    rs.on("error", (err) => {
      console.error("Error reading file:", err.message);
    });
  } catch (error) {
    console.error(error.message);
  }
};

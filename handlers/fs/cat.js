import fs from "fs";
import path from "path";
import { printCurrentDir } from "../../utils/print.js";

export const cat = async (inputPathToFile) => {
  const absolutePath = path.resolve(process.cwd(), inputPathToFile);
  try {
    await fs.promises.access(absolutePath, fs.constants.R_OK);
    const rs = fs.createReadStream(absolutePath, { encoding: "utf-8" });

    rs.on("data", (chunk) => {
      process.stdout.write(chunk);
    });
    rs.on("end", () => {
      process.stdout.write("\n");
    });
    rs.on("error", (err) => {
      console.error("Stream error:", err.message);
    });
    printCurrentDir();
  } catch (error) {
    console.error(error.message);
  }
};

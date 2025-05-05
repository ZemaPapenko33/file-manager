import fs from "fs";
import { printCurrentDir } from "../../utils/print.js";

export const ls = async () => {
  const currentPath = process.cwd();
  const directory = [];
  const files = [];
  try {
    let readDir = await fs.promises.readdir(currentPath, {
      withFileTypes: true,
    });
    readDir = readDir.filter((item) => !item.name.startsWith("."));

    readDir.forEach((item) => {
      if (item.isDirectory()) {
        directory.push(item);
      } else if (item.isFile()) {
        files.push(item);
      }
    });
    directory.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));
    const dirTable = directory.map((item) => ({
      Name: item.name,
      Type: "directory",
    }));

    const fileTable = files.map((item) => ({
      Name: item.name,
      Type: "file",
    }));
    console.table([...dirTable, ...fileTable]);
    printCurrentDir();
  } catch (error) {
    console.error(error.message);
  }
};

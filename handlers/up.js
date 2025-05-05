import path from "path";
import { userHomedir } from "../utils/consts.js";
import { printCurrentDir } from "../utils/print.js";

export const up = () => {
  const currentPath = process.cwd();
  const parent = path.dirname(currentPath);

  if (parent !== currentPath) {
    process.chdir(parent);
  } else {
    console.warn("You're in the root directory");
  }
  printCurrentDir();
};

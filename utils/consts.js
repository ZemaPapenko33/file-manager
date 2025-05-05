import { homedir } from "os";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { up, cd, ls } from "../handlers/navigation/index.js";
import { cat, add, mkdir, rn, cp, rm, mv } from "../handlers/fs/index.js";
import { handleExit } from "./handleExit.js";

export const userHomedir = homedir();
const usernameArg = process.argv.find((arg) => arg.startsWith("--username="));
if (!usernameArg) {
  console.error("Username is required. Please start with --username=YourName");
  process.exit(1);
}
export const userName = usernameArg.split("=")[1];
export const readLine = readline.createInterface({ input, output });
export const commands = {
  up,
  cd: async (userInputPath) => {
    await cd(userInputPath);
  },
  ls: async () => await ls(),
  cat: async (path) => await cat(path),
  add: async (fileName) => await add(fileName),
  mkdir: async (dirName) => await mkdir(dirName),
  rn: async (pathToFile, newName) => await rn(pathToFile, newName),
  cp: async (pathToFile, pathToNewFileDir) =>
    await cp(pathToFile, pathToNewFileDir),
  rm: async (pathToFile) => await rm(pathToFile),
  mv: async (pathToFile, pathToNewFileDir) =>
    await mv(pathToFile, pathToNewFileDir),
  ".exit": () => handleExit(userName, readLine),
};

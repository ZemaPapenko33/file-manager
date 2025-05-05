import { homedir } from "os";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { up, cd, ls } from "../handlers/navigation/index.js";
import { cat, add, mkdir, rn, cp, rm, mv } from "../handlers/fs/index.js";
import { osInfo } from "../handlers/os/osinfo.js";
import { hash } from "../handlers/hash/hash.js";
import { handleExit } from "./handleExit.js";
import { compress, decompress } from "../handlers/zlib/index.js";

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
    if (!userInputPath) {
      console.log("Invalid input: Missing path.");
      return;
    }
    await cd(userInputPath);
  },
  ls: async () => await ls(),
  cat: async (path) => {
    if (!path) {
      console.log("Invalid input: Missing file path.");
      return;
    }
    await cat(path);
  },
  add: async (fileName) => {
    if (!fileName) {
      console.log("Invalid input: Missing file name.");
      return;
    }
    await add(fileName);
  },
  mkdir: async (dirName) => {
    if (!dirName) {
      console.log("Invalid input: Missing directory name.");
      return;
    }
    await mkdir(dirName);
  },
  rn: async (pathToFile, newName) => {
    if (!pathToFile || !newName) {
      console.log("Invalid input: Missing file path or new name.");
      return;
    }
    await rn(pathToFile, newName);
  },
  cp: async (pathToFile, pathToNewFileDir) => {
    if (!pathToFile || !pathToNewFileDir) {
      console.log("Invalid input: Missing file path or destination directory.");
      return;
    }
    await cp(pathToFile, pathToNewFileDir);
  },
  rm: async (pathToFile) => {
    if (!pathToFile) {
      console.log("Invalid input: Missing file path.");
      return;
    }
    await rm(pathToFile);
  },
  mv: async (pathToFile, pathToNewFileDir) => {
    if (!pathToFile || !pathToNewFileDir) {
      console.log("Invalid input: Missing file path or destination directory.");
      return;
    }
    await mv(pathToFile, pathToNewFileDir);
  },
  os: (flag) => {
    if (!flag) {
      console.log("Invalid input: Missing flag.");
      return;
    }
    osInfo(flag);
  },
  hash: async (pathToFile) => {
    if (!pathToFile) {
      console.log("Invalid input: Missing file path");
      return;
    }
    await hash(pathToFile);
  },
  compress: async (pathToFile, pathToDes) => {
    if (!pathToFile || !pathToDes) {
      console.log("Invalid input: Missing file path");
      return;
    }
    await compress(pathToFile, pathToDes);
  },
  decompress: async (pathToFile, pathToDes) => {
    if (!pathToFile || !pathToDes) {
      console.log("Invalid input: Missing file path");
      return;
    }
    await decompress(pathToFile, pathToDes);
  },
  ".exit": () => handleExit(userName, readLine),
};
export const handleUserInput = async (input) => {
  const [command, ...args] = input.trim().split(" ");
  if (!commands[command]) {
    console.log("Invalid input: Unknown command.");
    return;
  }

  try {
    if (args.length) {
      await commands[command](...args);
    } else {
      await commands[command]();
    }
  } catch (error) {
    console.log("Invalid input: Something went wrong.", error.message);
  }
};

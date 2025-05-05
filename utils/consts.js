import { homedir } from "os";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { up } from "../handlers/up.js";
import { cd } from "../handlers/cd.js";
import { ls } from "../handlers/ls.js";
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
  ".exit": () => handleExit(userName, readLine),
};

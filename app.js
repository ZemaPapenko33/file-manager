import { printCurrentDir, printWelcomeMessage } from "./utils/print.js";
import { handleExit } from "./utils/handleExit.js";
import { userHomedir, userName, readLine, commands } from "./utils/consts.js";

const app = async () => {
  try {
    process.chdir(userHomedir);
    printWelcomeMessage(userName);
    printCurrentDir();

    readLine.on("line", (input) => {
      const [cmd, ...args] = input.trim().split(" ");
      const handler = commands[cmd];

      if (handler) {
        handler(...args);
      }
    });

    readLine.on("SIGINT", () => handleExit(userName, readLine));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

await app();

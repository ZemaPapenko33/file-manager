import { printGoodbyeMessage } from "./print.js";

export const handleExit = (userName, rl) => {
  printGoodbyeMessage(userName);
  rl.close();
  process.exit(0);
};

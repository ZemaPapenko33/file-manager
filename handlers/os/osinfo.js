import os from "os";
import { printCurrentDir } from "../../utils/print.js";

const flags = {
  "--EOL": () => console.log(os.EOL),
  "--cpus": () => {
    const cpus = os.cpus();
    cpus.forEach((cpu, index) => {
      console.log(`CPU ${index + 1}:`);
      console.log(`Model: ${cpu.model}`);
      console.log(`Speed: ${cpu.speed} MHz`);
      console.log("-------------------");
    });
  },
  "--homedir": () => console.log(os.homedir()),
  "--username": () => console.log(os.userInfo().username),
  "--architecture": () => console.log(os.arch()),
};

export const osInfo = (flag) => {
  if (flags[flag]) {
    flags[flag]();
    printCurrentDir();
  } else {
    console.log("Invalid flag");
  }
};

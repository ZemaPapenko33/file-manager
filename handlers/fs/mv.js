import { cp, rm } from "./index.js";

export const mv = async (pathToFile, pathToNewFileDir) => {
  await cp(pathToFile, pathToNewFileDir);
  await rm(pathToFile);
};

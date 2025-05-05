export const printWelcomeMessage = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}`);
};

export const printGoodbyeMessage = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

export const printCurrentDir = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

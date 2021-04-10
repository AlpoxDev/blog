export const customSleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

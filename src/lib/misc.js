export const sleep = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const varNameToString = (variable) => Object.keys({ variable })[0];

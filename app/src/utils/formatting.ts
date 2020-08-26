export const toSentenceCase = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str
    .split("")
    .slice(1, str.length)
    .join("")}`;

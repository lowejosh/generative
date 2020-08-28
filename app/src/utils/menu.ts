// Label formatters
export const formatPixelValue = (val: number) => `${val}px`;
export const formatPercentValue = (val: number) => `${val}%`;
export const formatTimesValue = (val: number) => `${val}x`;

// Other
export const toSentenceCase = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str
    .split("")
    .slice(1, str.length)
    .join("")}`;

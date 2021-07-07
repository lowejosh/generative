/**
 * Generates a random hexadecimal color
 * Source: https://stackoverflow.com/a/7638362/7457383
 */
export const getRandomColor = () => "#" + Math.random().toString(16).substr(-6);

export const getIndexTemplate = (sketchName: string) => `
export { ${sketchName} } from "./${sketchName}";
`;

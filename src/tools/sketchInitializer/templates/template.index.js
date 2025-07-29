const getIndexTemplate = (sketchName) => `
export { ${sketchName} } from "./${sketchName}";
`;

module.exports = getIndexTemplate;

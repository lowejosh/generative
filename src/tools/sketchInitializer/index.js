const fs = require("fs-extra");
const getComponentTemplate = require("./templates/template.component.js");
const getIndexTemplate = require("./templates/template.index.js");
const getMenuTemplate = require("./templates/template.menu.js");
const getSketchTemplate = require("./templates/template.sketch.js");
const getVariablesTemplate = require("./templates/template.variables.js");

const init = (sketchName) => {
  if (!sketchName) {
    console.log("Please supply a name");
  } else {
    const path = `src/sketches/${sketchName}`;
    fs.ensureDirSync(`./${path}`);

    // file suffix : content
    const inputs = {
      index: getIndexTemplate(sketchName),
      component: getComponentTemplate(sketchName),
      menu: getMenuTemplate(sketchName),
      sketch: getSketchTemplate(sketchName),
      variables: getVariablesTemplate(sketchName),
    };

    // read/write files
    Object.entries(inputs).forEach(([type, content]) => {
      const suffix = type === "component" || type === "menu" ? "tsx" : "ts";
      fs.writeFile(
        type === "index"
          ? path.length
            ? `${path}/index.ts`
            : "index.ts"
          : `${path}/${sketchName}${
              type !== "component" ? `.${type}` : ""
            }.${suffix}`,
        content,
        (err) => {
          return err
            ? console.log(err)
            : console.log(
                type === "index"
                  ? `successfully created ${path}/index.ts`
                  : `successfully created ${path}${
                      type !== "component" ? `.${type}` : ""
                    }.${suffix}`
              );
        }
      );
    });
  }
};

module.exports = { init };

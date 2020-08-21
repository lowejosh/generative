const fs = require("fs-extra");
const getComponentTemplate = require("./templates/template.component.js");
const getIndexTemplate = require("./templates/template.index.js");
const getMenuTemplate = require("./templates/template.menu.js");
const getSketchTemplate = require("./templates/template.sketch.js");

const init = (path) => {
  if (!path) {
    console.log("Please supply a pathway");
  } else {
    let sketchName = path;
    let folder = "";

    // if a folder path is specified
    if (path.includes("/")) {
      sketchName = path.substr(path.lastIndexOf("/") + 1, path.length);
      folder = path.substr(0, path.lastIndexOf("/"));
      fs.ensureDirSync(`./${folder}`);
    }

    // file suffix : content
    const inputs = {
      index: getIndexTemplate(sketchName),
      component: getComponentTemplate(sketchName),
      menu: getMenuTemplate(sketchName),
      sketch: getSketchTemplate(sketchName),
    };

    // read/write files
    Object.entries(inputs).forEach(([name, content]) => {
      const suffix = name === "component" ? "tsx" : "ts";
      fs.writeFile(
        name === "index"
          ? folder.length
            ? `${folder}/index.ts`
            : "index.ts"
          : `${path}${name !== "component" ? `.${name}` : ""}.${suffix}`,
        content,
        (err) => {
          return err
            ? console.log(err)
            : console.log(
                name === "index"
                  ? `successfully created ${folder}/index.ts`
                  : `successfully created ${path}${
                      name !== "component" ? `.${name}` : ""
                    }.${suffix}`
              );
        }
      );
    });
  }
};

module.exports = { init };

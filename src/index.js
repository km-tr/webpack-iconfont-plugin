import nodify from "nodeify";
import fs from "fs-extra";
import globParent from "glob-parent";
import path from "path";
import iconfont from "./generator";
import hasha from "hasha";

export default class IconfontPlugin {
  constructor(options = {}) {
    const required = ["svgs", "fonts", "styles"];

    for (let r of required) {
      if (!options[r]) {
        throw new Error(`Require '${r}' option`);
      }
    }

    this.options = Object.assign({}, options);
    this.fileDependencies = [];
    this.hashes = {};

    this.compile = this.compile.bind(this);
    this.watch = this.watch.bind(this);
  }

  apply(compiler) {
    const name = 'webpackIconfontPlugin';
    compiler.hooks.run.tapAsync(name, this.compile);
    compiler.hooks.watchRun.tapAsync(name, this.compile);
    compiler.hooks.afterEmit.tapAsync(name, this.watch);
  }

  compile(compiler, callback) {
    const { options } = this;
    return nodify(
      iconfont(options).then(result => {
        const { fontName } = result.config;
        let destStyles = null;

        if (result.styles) {
          destStyles = path.resolve(this.options.styles);
        }

        return Promise.all(
          Object.keys(result).map(type => {
            if (type === "config" || type === "usedBuildInStylesTemplate") {
              return Promise.resolve();
            }

            const content = result[type];
            const hash = hasha(content);
            let destFilename = null;

            if (type !== "styles") {
              destFilename = path.resolve(
                path.join(this.options.fonts, `${fontName}.${type}`)
              );
            } else {
              destFilename = path.resolve(destStyles);
            }

            if (this.hashes[destFilename] !== hash) {
              this.hashes[destFilename] = hash;
              return new Promise((resolve, reject) => {
                fs.outputFile(destFilename, content, error => {
                  if (error) {
                    return reject(new Error(error));
                  }
                  return resolve();
                });
              });
            }
          })
        );
      }),
      error => callback(error)
    );
  }

  watch(compiler, callback) {

    const globPatterns =
      typeof this.options.svgs === "string"
        ? [this.options.svgs]
        : this.options.svgs;

    globPatterns.forEach(globPattern => {
      const context = globParent(globPattern);
      if (!compiler.contextDependencies.has(context)) {
        compiler.contextDependencies.add(context);
      }
    });

    return callback();
  }
}

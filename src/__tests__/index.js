import fs from "fs";
import path from "path";
import del from "del";
import IconfontPlugin from "../";
import webpackConfigBase from "./config/base";
import webpack from "webpack";

const baseConfig = {
  svgs: path.resolve(__dirname, "assets/svgs/**/*.svg"),
  fonts: path.resolve(__dirname, "assets/fonts"),
  styles: path.resolve(__dirname, "assets/scss/_iconfont.scss")
};

const assets = path.resolve(__dirname, "assets");

afterEach(() =>
  del([
    path.resolve(__dirname, "build"),
    `${assets}/fonts`,
    `${assets}/styles/iconfont.css`
  ]));

describe("webpack execution", () => {
  it(
    "should compile to the expected result",
    done => {
      const webpackConfig = Object.assign({}, webpackConfigBase, {
        plugins: [new IconfontPlugin(baseConfig)]
      });

      webpack(webpackConfig, (err, stats) => {
        if (err) {
          done(err);
          return;
        }
        done();
        console.log(
          stats.toString({
            context: path.resolve(__dirname, ".."),
            chunks: true,
            chunkModules: true,
            modules: false
          })
        );
        if (stats.hasErrors()) {
          done(
            new Error(
              stats.toString({
                context: path.resolve(__dirname, ".."),
                errorDetails: true
              })
            )
          );
          return;
        }
      });
    },
    10000
  );
});

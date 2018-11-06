import path from "path";

export default {
  mode: "none",
  entry: path.resolve(__dirname, "../assets/entry.js"),
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)?$/,
        use: ["url-loader"]
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "i/[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build")
  },
  plugins: [],
  resolve: {
    modules: ["node_modules"]
  }
};

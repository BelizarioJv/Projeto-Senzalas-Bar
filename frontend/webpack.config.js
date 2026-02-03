const path = require("path");

module.exports = {
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // para achar o diretorio dos arquivos estaticos gerados pelo webpack server
    },
    compree: true,
    port: 8080,
  },
  entry: {
    index: "./src/js/index.js", // arquivo de entrada codigo fonte
  },
  mode: "development", // modo para ver como o web pack esta compactando nosso codigo quando gerado
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },
  output: {
    filename: "[name].min.js",
  },
};

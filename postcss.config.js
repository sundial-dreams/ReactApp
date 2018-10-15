module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("precss"),
    require("autoprefixer"),
    require("postcss-preset-env"),
    require("postcss-nested")
  ]
};
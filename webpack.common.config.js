//common config
const {join,resolve} = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const HappyPack = require("happypack");

const happyPackThreadPool = HappyPack.ThreadPool({
  size:require("os").cpus().length
});

const paths = {
  dist: resolve(__dirname, "./dist"),
  src: resolve(__dirname, "./src"),
  pages: join(__dirname, "src/pages"),
  components: join(__dirname, "src/components"),
  router: join(__dirname, "src/router"),
  reduxs: join(__dirname, "src/reduxs"),
  actions: join(__dirname, "src/reduxs/actions"),
  reducer: join(__dirname, "src/reduxs/reducer"),
};
const regexps = {
  exclude: /node_modules/,
  html: /\.html$/,
  style: /\.(sass|scss|css)$/,
  js: /\.(jsx|js)$/,
  picture: /\.(gif|png|jpg)$/,
};
const loaders = {
  babel: "babel-loader",
  html: "html-loader",
  css: "css-loader",
  scss: "sass-loader",
  url: "url-loader",
  postcss: "postcss-loader",
  astroturf : "astroturf/loader"
};
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: paths.src + "/index.html",
    filename: "./index.html",
    title: "Caching"
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  new CleanWebpackPlugin(['dist/!*.*'], {
    verbose: true,
    dry: true,
    beforeEmit: true,
    allowExternal: true
  }),
  new webpack.HashedModuleIdsPlugin(),
  new ParallelUglifyPlugin({
    test:regexps.js,
    exclude:regexps.exclude,
    sourceMap:true,
    cacheDir:resolve(__dirname,"dist")
  }),
  new HappyPack({
    loaders:[loaders.babel,loaders.astroturf],
    threadPool:happyPackThreadPool,
  })
  /*new UglifyJsWebpackPlugin({
    test: regexps.js,
    exclude: regexps.exclude,
    cache: true,
    parallel: true,
    sourceMap: true
  })*/
];
const module = {
  rules: [
    {
      test: regexps.html,
      exclude: regexps.exclude,
      use: {
        loader: loaders.html,
        options: {
          minimize: true
        }
      }
    },
    {
      test: regexps.js,
      exclude: regexps.exclude,
      include: resolve(__dirname,"src"),
      /*use: {
        loader: loaders.babel,
        options: {
          cacheDirectory: true,
        }
      },*/
      /*
      loaders:[
        {
          loader: loaders.babel,
          options: {
            cacheDirectory: true,
          }
        },
        {
          loader: loaders.astroturf
        }
      ]*/
      use:"happypack/loader",

    },
    {
      test: regexps.style,
      exclude: regexps.exclude,
      loaders: [
        MiniCssExtractPlugin.loader,
        {
          loader: loaders.css,
          options: {
            modules: true,
            sourceMap: true,
            importLoader: 20,
            localIdentName: '[local]___[hash:base64:5]'
          }
        },
        {
          loader: loaders.scss,
          options: {
            sourceMap: true
          }
        },
        {
          loader: loaders.postcss,
          options:{
            config:{
              path: __dirname,
            },
            sourceMap: true
          }
        }
      ]
    },
    {
      test: regexps.picture,
      use: [
        {
          loader: loaders.url,
          options: {
            limit: 8192
          }
        }
      ]
    }
  ]
};

module.exports = {
  entry: [
    paths.src + "/index.jsx",
    paths.src + "/index.html"
  ],
  output: {
    path: paths.dist,
    chunkFilename: "[name].[hash].js",
    filename: '[name].[hash].js',
  },
  module,
  plugins,
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      pages: paths.pages,
      components: paths.components,
      router: paths.router,
      reduxs: paths.reduxs,
      actions: paths.actions,
      reducer: paths.reducer,
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
    minimizer: [/*new UglifyJsWebpackPlugin({
      test: regexps.js,
      exclude: regexps.exclude,
      cache: true,
      parallel: true,
      sourceMap: true
    })*/
    new ParallelUglifyPlugin({
      test:regexps.js,
      exclude:regexps.exclude,
      sourceMap:true
    })
    ]
  }
};

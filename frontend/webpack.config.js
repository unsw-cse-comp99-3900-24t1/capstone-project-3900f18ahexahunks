// // // // const path = require('path');

// // // // module.exports = {
// // // //   entry: './src/index.js', // Update this to your entry file
// // // //   output: {
// // // //     path: path.resolve(__dirname, 'dist'),
// // // //     filename: 'bundle.js',
// // // //   },
// // // //   module: {
// // // //     rules: [
// // // //       {
// // // //         test: /\.(js|jsx)$/,
// // // //         include: path.resolve(__dirname, 'src'),
// // // //         use: {
// // // //           loader: 'babel-loader',
// // // //           options: {
// // // //             presets: ['@babel/preset-env', '@babel/preset-react'],
// // // //             plugins: ['istanbul'],
// // // //           },
// // // //         },
// // // //       },
// // // //       {
// // // //         test: /\.css$/, // Add rule for CSS files
// // // //         use: ['style-loader', 'css-loader'],
// // // //       },
// // // //     ],
// // // //   },
// // // //   resolve: {
// // // //     extensions: ['.js', '.jsx'], // Add .jsx to resolve extensions
// // // //   },
// // // //   devtool: 'inline-source-map', // Useful for debugging
// // // // };
// // // const path = require('path');

// // // module.exports = {
// // //   entry: './src/index.js',
// // //   output: {
// // //     path: path.resolve(__dirname, 'dist'),
// // //     filename: 'bundle.js',
// // //   },
// // //   module: {
// // //     rules: [
// // //       {
// // //         test: /\.(js|jsx)$/,
// // //         include: path.resolve(__dirname, 'src'),
// // //         use: {
// // //           loader: 'babel-loader',
// // //           options: {
// // //             presets: ['@babel/preset-env', '@babel/preset-react'],
// // //             plugins: ['istanbul'],
// // //           },
// // //         },
// // //       },
// // //       {
// // //         test: /\.css$/,
// // //         use: ['style-loader', 'css-loader'],
// // //       },
// // //     ],
// // //   },
// // //   resolve: {
// // //     extensions: ['.js', '.jsx'],
// // //   },
// // //   devtool: 'inline-source-map',
// // //   devServer: {
// // //     static: {
// // //       directory: path.join(__dirname, 'dist'),
// // //     },
// // //     compress: true,
// // //     port: 3000,
// // //     hot: true,
// // //   },
// // // };
// // const path = require('path');

// // module.exports = {
// //   entry: './src/index.js',
// //   output: {
// //     path: path.resolve(__dirname, 'dist'),
// //     filename: 'bundle.js',
// //     publicPath: '/',
// //   },
// //   mode: 'development', // Add this line
// //   module: {
// //     rules: [
// //       {
// //         test: /\.(js|jsx)$/,
// //         include: path.resolve(__dirname, 'src'),
// //         use: {
// //           loader: 'babel-loader',
// //           options: {
// //             presets: ['@babel/preset-env', '@babel/preset-react'],
// //             plugins: ['istanbul'],
// //           },
// //         },
// //       },
// //       {
// //         test: /\.css$/,
// //         use: ['style-loader', 'css-loader'],
// //       },
// //     ],
// //   },
// //   resolve: {
// //     extensions: ['.js', '.jsx'],
// //   },
// //   devtool: 'inline-source-map',
// //   devServer: {
// //     static: {
// //       directory: path.join(__dirname, 'dist'),
// //     },
// //     compress: true,
// //     port: 3000, // Use the port where your app runs
// //     hot: true,
// //     historyApiFallback: true,
// //   },
// // };
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const Dotenv = require('dotenv-webpack');

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//     publicPath: '/', // Ensure paths are correctly resolved
//   },
//   mode: 'development',
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         include: path.resolve(__dirname, 'src'),
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//             plugins: ['istanbul'],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif|svg|ico)$/, // Add this rule to handle images
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[ext]',
//               outputPath: 'assets/images',
//             },
//           },
//         ],
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   devtool: 'inline-source-map',
//   devServer: {
//     static: [
//       {
//         directory: path.join(__dirname, 'public'), // Serve static assets from public directory
//       },
//       {
//         directory: path.join(__dirname, 'dist'), // Also serve files from the dist directory
//       },
//     ],
//     compress: true,
//     port: 3000,
//     hot: true,
//     historyApiFallback: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, 'public', 'index.html'),
//       inject: 'body',
//       favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
//     }),
//     new webpack.DefinePlugin({
//       'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || ''),
//     }),
//     new Dotenv({
//       path: './.env',
//     }),
//   ],
// };
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Ensure paths are correctly resolved
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['istanbul'], // Remove react-refresh/babel if it was present
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/, // Add this rule to handle images
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'), // Serve static assets from public directory
      },
      {
        directory: path.join(__dirname, 'dist'), // Also serve files from the dist directory
      },
    ],
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      inject: 'body',
      favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || ''),
    }),
    new Dotenv({
      path: './.env',
    }),
  ],
};

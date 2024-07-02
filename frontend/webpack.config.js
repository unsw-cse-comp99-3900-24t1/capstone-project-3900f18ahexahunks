const path = require('path');

module.exports = {
  entry: './src/index.js', // Update this to your entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['istanbul'],
          },
        },
      },
      {
        test: /\.css$/, // Add rule for CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add .jsx to resolve extensions
  },
  devtool: 'inline-source-map', // Useful for debugging
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const remotes = {
  development: {
    secondApp: 'secondApp@http://localhost:3001/remoteEntry.js',
  },
  production: {
    secondApp: 'secondApp@http://localhost:3001/remoteEntry.js',
  },
}

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
  output: {
    publicPath: "http://localhost:3000/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mainApp',
      // library: { type: 'var', name: 'mainApp' },
      filename: 'remoteEntry.js',
      exposes: {
        // expose each component you want
        './Button': './src/components/Button',
      },
      remotes: {
        secondApp: remotes.development.secondApp,
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const { ModuleFederationPlugin } = require('webpack').container;

const remotes = {
  development: {
    mainApp: 'mainApp@http://localhost:3000/remoteEntry.js',
  },
  production: {
    mainApp: 'mainApp@http://localhost:3000/remoteEntry.js',
  },
}

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
  },
  output: {
    publicPath: "http://localhost:3001/", // Added this
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
      name: 'secondApp',
      // library: { type: 'var', name: 'secondApp' },
      filename: 'remoteEntry.js',
      exposes: {
        // expose each component you want 
        './Counter': './src/components/Counter',
      },
      remotes: {
        mainApp: remotes.development.mainApp,
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

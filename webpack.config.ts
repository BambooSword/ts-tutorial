import path from 'path'
import webpack from 'webpack'
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server'

const config: webpack.Configuration = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
	mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}

export default config

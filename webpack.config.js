const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV === 'dev');

module.exports = {
  entry: {
    common: './src/js/common.js',
    index: './src/js/index.js'
  },
  mode: IS_DEV,
  plugins: [
    new HtmlWebpackPlugin({
      // HTML documentのtitle
      title: 'Home',
      template: './src/index.html',
      // <script>タグはbody終了タグの直前で読み込む
      inject: true,
      // JSファイルなどにハッシュが付く（キャッシュ対策）
      hash: true
    }),
    new HtmlWebpackPlugin({
      title: 'Page A',
      template: './src/page.html',
      inject: true,
      filename: 'page.html',
      // 指定したchunkのみを含める
      chunks: ['common'],
      hash: true
    })
  ],
  output: {
    filename: 'assets/js/[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};
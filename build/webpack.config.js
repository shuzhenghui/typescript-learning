const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: resolve(__dirname, '../src/index.ts'),
    output: {
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    devServer: {
        hot: true,
        contentBase: './dist',
        stats: 'errors-only', // 编译时仅显示error信息
        compress: false, // 是否压缩
        host: 'localhost',
        port: 8848,
        open: true
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
            title: 'ts-learning'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist']
        })
    ]
}
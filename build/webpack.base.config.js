const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')



module.exports = {
    entry: {
        app: path.join(__dirname, '../src')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                    use: 'css-loader?module'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('style.css'),
        new HtmlWebpackPlugin({
            title: 'Vue-webpack template step by step',
            filename: 'index.html',
            inject: true,
            hash: true,
            template: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ]
}
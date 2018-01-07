const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const progressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const friendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
    /*Точка входа откуда мы будем все собирать*/
    entry: {
        app: path.join(__dirname, 'src')
    },
    /*Точка выхода откуда мы будем все собирать*/
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
        poll: 1000
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    /*Создаем экземпляр плагина и задаем параметры*/
    plugins: [
        new HtmlWebpackPlugin({
            /*Вставляет заголовок в собранный шаблон*/
            title: 'Vue webpack template',
            /*Как будет называться собранный файл*/
            filename: 'index.html',
            /*куда нам нужно вставлять скриптовые теги head false true body*/
            inject: true,
            /*Добавляет хэш к урлу собранного скрипта*/
            hash: true,
            /*Для генерации собранногго шаблона мы будем использовать index.html*/
            template: 'index.html',
            minify: {
                /*Убирает комментарии*/
                removeComments: true,
                /*убирает пробелы*/
                collapseWhitespace: true,
                /*убирает кавычки*/
                removeAttributeQuotes: true
            }
        }),
        /*webpack игорирутет эти файлы и не вотчит*/

        new webpack.WatchIgnorePlugin([
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'src/component.js')
        ]),
        new progressBarWebpackPlugin(),
        new friendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:8080'],
                notes: ['Some additional notes to be displayed upon successful compilation']
            },
            clearConsole: true
        })
    ]
}
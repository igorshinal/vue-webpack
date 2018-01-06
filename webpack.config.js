const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    /*Создаем экземпляр плагина и задаем параметры*/
    plugins: [
        new HtmlWebpackPlugin({
            /*Вставляет заголовок в собранный шаблон*/
            title: 'Vue webpack template',
            /*Как будет называться собранный файл*/
            filename: 'test.html',
            /*куда нам нужно вставлять скриптовіе теги head false true body*/
            inject: true,
            /*Добавляет хэш к урлу собранного скрипта*/
            hash: true,
            /*Для генерации собранногго шаблона мы будем использовать index.html*/
            template: 'index.html'
        })
    ]
}
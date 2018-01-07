const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

/*настройки которые касаются обоих сред разработки*/
const baseConfig = {
    /*Точка входа откуда мы будем все собирать*/
    entry: {
        app: path.join(__dirname, 'src')
    },
    /*Точка выхода откуда мы будем все собирать*/
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    }
}

const productionConfig = () => {
    const config = {
        plugins: [
            new ProgressBarWebpackPlugin(),
            /* Работате с переменными окружения */
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            /*Минимизирует айди которые сборщик использует для подгрузки*/
            new webpack.optimize.OccurrenceOrderPlugin(),

            new CompressionWebpackPlugin({
                /*как будут называться сжатые файлы*/
                asset:'[path].gz[query]',
                /*алгоритм сжатия*/
                algorithm: 'gzip',
                /*расширения файлов которые будут сжаты*/
                test: /\.(js|css|html|svg)$/,
                /*сжимать файлы только те которые весят больше 10240кбт*/
                threshold: 1,
                /*коэфициент сжатия*/
                minRatio: 0.9,
                /*удаляет оригинальніе файлі не сжатіе в сборке*/
                // deleteOriginalAssets: true

            })
        ]
    }
    return merge(baseConfig, config)
}

const developmentConfig = () => {
    const config = {
        devServer: {
            /*история для работы с пользовательскими путями*/
            historyApiFallback: true,
            stats: 'errors-only',
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            host: process.env.HOST,
            port: process.env.PORT
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
                path.join(__dirname, 'node_modules')
            ]),

            new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: ['You application is running here http://localhost:8080'],
                    notes: ['Some additional notes to be displayed upon successful compilation']
                },
                clearConsole: true
            }),
            /*Подавляет ошибки и собирает информацию сборки*/
            new webpack.NoEmitOnErrorsPlugin(),

            /* Работате с переменными окружения */
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            })
        ]

    }
    return merge(baseConfig, config)

}

module.exports = (env) => {
console.log('env=', env)
    if (env === 'production') return productionConfig()
    return developmentConfig

}
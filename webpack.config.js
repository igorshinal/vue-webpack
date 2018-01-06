const path = require('path')

module.exports = {
    /*Точка входа откуда мы будем все собирать*/
    entry: {
        app: path.join(__dirname, 'src')
    },
    /*Точка выхода откуда мы будем все собирать*/
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'build.js'
    }
}
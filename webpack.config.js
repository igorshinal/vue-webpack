const merge = require('webpack-merge')
const baseConf = require('./build/webpack.base.config')
const prodConf = require('./build/webpack.prod.config')
const devConf = require('./build/webpack.dev.config')


module.exports = (env) => {
    console.log('env = ', env)
    if (env === 'production') return merge(baseConf, prodConf)
    return merge(baseConf, devConf)
}
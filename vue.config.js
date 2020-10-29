module.exports = {
    publicPath:'./',
    productionSourceMap: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title= '飞哥吃鸡记录'
                return args
            })
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'https://blog.rhyland.top/chicken',
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/api': '' //规定请求地址以什么作为开头
                }
            }
        }
    }
}

module.exports = {
    publicPath:'./',
    productionSourceMap: false,
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

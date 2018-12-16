const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    baseUrl: "/", //将部署应用程序的基本URL
    chainWebpack: (config) => {
        config.resolve.alias.set('$', resolve('node_modules/jquery/dist/jquery'))
        // .set('@$', resolve('src'))
        // .set('assets',resolve('src/assets'))
        // .set('components',resolve('src/components'))
        // .set('layout',resolve('src/layout'))
        // .set('base',resolve('src/base'))
        // .set('static',resolve('src/static'))
    },
    devServer: {
        open: true,
        // 192.168.2.236
        host: "localhost",
        // port: 8080,
        // 配置跨域处理,设置代理
        proxy: {
            "/api": {
                target: " https://www.easy-mock.com/mock/5bfa87c2ca4e39455ecc6933/qiuxue", // 域名
                ws: true, // 是否启用websockets
                changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    }
};

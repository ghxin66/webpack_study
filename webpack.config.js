// npm install style-loader css-loader --save-dev      //打包css style

// npm install extract-text-webpack-plugin --save-dev    //打包css style  wepack4.0一下版本

// npm install mini-css-extract-plugin  --save-dev   // //打包css style  wepack4.0一下版本

// npm install optimize-css-assets-webpack-plugin  --save-dev  //压缩css

// npm install –save-dev sass-loader  //打包scss//因为sass-loader依赖于node-sass，所以还要安装node-sass

// npm install –save-dev node-sass

// npm install  url-loader file-loader img-loader --save-dev    //url-loader file-loader用于打包css中的图片，img-loader用于图片压缩

// npm install html-webpack-plugin --save-dev       //打包html文件


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js',
        bundle: './src/js/bundle.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.scss$/, // 正则表达式，表示.scss后缀的文件
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../',
                    reloadAll: true,
                    // hmr: process.env.NODE_ENV === 'development', //开发模式和生产模式 production //development
                },
            }, 'css-loader', 'sass-loader']
        },
        {
            test: /\.(jpg|png|gif|bmp|jpeg)$/, //正则表达式匹配图片规则
            use: [{
                loader: 'url-loader',
                options: {
                    // publicPath: '../',
                    outputPath: "./",
                    limit: 10000, //限制打包图片的大小：
                    //如果大于或等于10000Byte，则按照相应的文件名和路径打包图片；如果小于10000Byte，则将图片转成base64格式的字符串。
                    name: 'image/[name].[hash:8].[ext]', //css中的images图片将会打包在build/image下;
                }
            }]
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                publicPath: '../',
                limit: 10000,
                name: 'media/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                publicPath: '../',
                limit: 10000,
                name: 'fonts/[name].[hash:8].[ext]'
            }
        }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            title: 'Myindex',
            filename: 'index.html', // 输出的文件名
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }, // 移除注释
            template: 'src/index.html', // 我们原来的index.html路径，作为模板
            chunks: ['bundle'],
        }),
        new HtmlWebpackPlugin({
            title: 'product',
            filename: 'product.html', // 输出的文件名
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }, // 移除注释
            template: 'src/product.html', // 我们原来的index.html路径，作为模板
            chunks: ['index'],

        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: true,
        }),
        new CleanWebpackPlugin()

    ],


};
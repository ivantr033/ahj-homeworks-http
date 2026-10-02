const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            helpdesk: './src/index.js',
            image: './src/image.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            clean: true,
        },
        devtool: isProduction ? false : 'eval-source-map',
        devServer: {
            port: 8080,
            hot: true,
            open: true,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: "defaults" }]
                            ]
                        }
                    },
                    type: 'javascript/auto'
                },
                {
                    test: /\.html$/,
                    use: { loader: 'html-loader' }
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                chunks: ['helpdesk']
            }),
            new HtmlWebpackPlugin({
                template: './src/image.html',
                filename: 'image.html',
                chunks: ['image']
            })
        ]
    };
};

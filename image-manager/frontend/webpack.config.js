const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        // Definimos el punto de entrada estándar requerido por tu package.json
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            clean: true,
        },
        // Forzamos el mapeo de errores limpio para desarrollo rápido
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
                            // Inyección directa de presets modernos para evitar el error 'sourceType: module'
                            presets: [
                                ['@babel/preset-env', { targets: "defaults" }]
                            ]
                        }
                    },
                    // 🛡️ EL FUSIBLE SUPREMO: Obliga a Webpack a tratar todo como módulo JS nativo moderno
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
                filename: 'index.html'
            }),
            ...(isProduction ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })] : [])
        ]
    };
};

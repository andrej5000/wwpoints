const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    // sourcemap generation
    devtool: 'source-map',

    module: {

        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },

            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            localIdentName: '[local]--[hash:base64:5]',
                            modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            keepQuery: true, // # to keep #iefix etc.
                            sourceMap: true // obviously required to determine correct relative path
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            debug: true,
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            filename: './index.html',
            template: './src/index.html'
        })
    ],

    output: {
        filename: '[name].[hash].js',
        path: path.resolve('./dist'), // this is required to be relative to the project root
        publicPath: '/'
    }
};

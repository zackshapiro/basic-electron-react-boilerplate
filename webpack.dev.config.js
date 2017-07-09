const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const ASSETS_DIR = path.resolve(__dirname, 'assets');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR, ASSETS_DIR];

module.exports = {
    entry: ['babel-polyfill', SRC_DIR + '/index.js'],

    output: {
        path: OUTPUT_DIR,
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader',
            },
            { 
                test: /\.scss$/, 
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-3'],
                },
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
                include: defaultInclude,
            },
            { 
                test: /\.(ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: 'file-loader',
            },
        ],
    },
    target: 'electron-renderer',
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: OUTPUT_DIR,
        stats: {
            colors: true,
            chunks: false,
            children: false,
        },
    },
};

// {
//                 test: /\.jsx?$/,
//                 enforce: "pre",
//                 loader: "eslint-loader",
//                 exclude: /node_modules/
//             },

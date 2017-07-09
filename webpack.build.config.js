const webpack = require('webpack');
const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

module.exports = {
    entry: SRC_DIR + '/index.js',
    output: {
        path: OUTPUT_DIR,
        publicPath: './',
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
                test: /\.(ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: 'file-loader',
            },
        ],
    },
    target: 'electron-renderer',
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new BabiliPlugin(),
    ],
    stats: {
        colors: true,
        children: false,
        chunks: false,
        modules: false,
    },
};

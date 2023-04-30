const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")

module.exports = {
    mode: "production",
    entry: {
        background: path.resolve(__dirname, "..", "src", "background.ts"),
        content: path.resolve(__dirname, "..", "src/content", "content.ts"),
        underline: path.resolve(__dirname, "..", "src/style", "underline.sass"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.sass$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name].css'
                },
                use: ['sass-loader'],
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{from: ".", to: ".", context: "public"}]
        }),
        new EnvironmentPlugin({
            TRANSLATION_SERVER: 'http://localhost:5000/'
        }),
        new FixStyleOnlyEntriesPlugin({ extensions:['sass'] }),
    ],
}
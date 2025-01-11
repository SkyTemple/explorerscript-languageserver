const path = require("path");

module.exports = {
    mode: 'production',
    entry: './src/extension.ts',
    output: {
        filename: 'extension.js',
        path: path.resolve(__dirname, 'out'),
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        mainFields: ['node', 'main']
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: false
    },
    externals: {
        'vscode': 'commonjs vscode'
    },
};
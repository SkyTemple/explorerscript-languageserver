import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'production',
    entry: './src/server.ts',
    output: {
        filename: 'server.mjs',
        path: path.resolve(__dirname, 'out'),
        library: {
            type: "module",
        },
    },
    resolve: {
        extensions: ['.ts', '.js'],
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
    experiments: {
        outputModule: true
    }
};
const path = require('path');

module.exports = {
    entry: './entry.js',
    output: {
        path: path.resolve(__dirname, 'npm'),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },
};
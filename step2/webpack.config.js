const path = require('path');

module.exports = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  }
};
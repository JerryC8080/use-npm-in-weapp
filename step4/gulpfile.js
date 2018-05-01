const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const webpackConfig = {
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['es2015'],
            },
        }],
    },
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',        
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
    ],
};

// 清空 ./dist 目录
gulp.task('clean', () => del(['./dist/**']));

// 打包 npm 依赖
gulp.task('npm', () => {
    gulp.src('./src/npm/*.js')
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest('./dist/npm'));
});

// 编译 JS 文件
gulp.task('scripts', () => {
    gulp.src(['./src/**/*.js', '!./src/npm/*.js'])
        .pipe(babel({
            presets: ['stage-0', 'es2015'],
        }))
        .pipe(gulp.dest('./dist'));
});

// 开发模式命令
gulp.task('build', ['clean'], () => runSequence('scripts', 'npm'));
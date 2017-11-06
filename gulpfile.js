'use strict';
var gulp        = require('gulp'),
    cssmin      = require('gulp-cssmin'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    pump        = require('pump'),
    sass        = require('gulp-sass'),
    babel       = require('gulp-babel'),
    ngAnnotate  = require('gulp-ng-annotate');

var sassFiles   = './public/style/**/*.scss';
var jsFiles     =  [
        './public/app/**/*.js',
    ];

////////////////////////////////////////////////////////////

gulp.task('sass', function () {
    pump([
        gulp.src(sassFiles),
        concat('styles.min.css'),
        sass().on('error', sass.logError),
        cssmin(),
        gulp.dest('./public/dist/')
    ])
});

gulp.task('compress', function () {
    pump([
        gulp.src(jsFiles),
        concat('bundle.js'),
        ngAnnotate({
            mangle: true
        }),
        uglify({
            compress: {
                pure_funcs: ['console.log', 'c.log']
            },
            mangle: true
        }),
        gulp.dest('./public/dist/')
    ]);
});

gulp.task('compress', function () {
    pump([
        gulp.src(jsFiles),
        babel({
            presets: ['env']
        }).on('error', err => console.log('Babel error! ', err)),
        concat('bundle.js'),
        ngAnnotate({
            mangle: true
        }),
        uglify({
            compress: {
                pure_funcs: ['console.log', 'c.log']
            },
            mangle: true
        }),
        gulp.dest('./public/dist/')
    ]);
});

gulp.task('compress-dev', function () { // keep logs
    pump([
        gulp.src(jsFiles),
        babel({
            presets: ['env']
        }).on('error', err => console.log('Babel error! ', err)),
        concat('bundle.js'),
        ngAnnotate({
            mangle: true
        }),
        uglify({
            compress: {
                pure_funcs: []
            },
            mangle: true
        }).on('error', err => console.log('Uglify error! ', err)),
        gulp.dest('./public/dist/')
    ]);
});

gulp.task('ngannotate', function () {
    return gulp.src('public/app.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('.'));
});

gulp.task('watchAll', function () {
    gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsFiles, ['compress-dev']);
});

gulp.task('default', ['sass', 'compress']);
gulp.task('dev', ['compress-dev', 'sass', 'watchAll']);

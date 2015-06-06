var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    compass = require('gulp-compass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('default', ['js', 'css', 'images', 'html'], function () {
});

gulp.task('html', function () {
    return gulp
        .src(['./src/*.html', './src/.htaccess', './src/robots.txt'])
        .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
    return gulp
        .src(['./src/bower_components/jquery-backstretch/jquery.backstretch.min.js', './src/resource/js/*.js'])
        .pipe(concat('all.min.js', {newLine: ';'}))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('build/resource/js'));
});

gulp.task('css', function () {
    return gulp
        .src('./src/resource/sass/app.scss')
        .pipe(
            compass({
                config_file: './config.rb',
                css: 'build/resource/css',
                sass: './src/resource/sass'
            })
        )
        .pipe(gulp.dest('build/resource/css'));
});

gulp.task('images', function () {
    return gulp
        .src('./src/resource/images/**/*')
        .pipe(
            imagemin({
                progressive: true,
                optimizationLevel: 3
            })
        )
        .pipe(gulp.dest('build/resource/images'));
});
var gulp = require('gulp');

var sass = require('gulp-sass');

// var autofixer=require('gulp-autofixer');

// var run=require('gulp-run');

var minCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var server = require('gulp-webserver');

var data = require('./data/data.json');

gulp.task('css', function () {
    gulp.src('./src/**/*.scss')
        .pipe(sass())
        // .pipe(autofixer({

        // }))
        .pipe(minCSS())
        .pipe(gulp.dest('build/css'))
})
gulp.task('js', function () {
    gulp.src('./src/**.js')
        .pipe(uglify())
        .pipe(gulp.dest('bulid/js'))
})
gulp.task('server', function () {
    gulp.src('./src')
        .pipe(server({
            port: 9090,
            open: true,
            middleware: function (req, res, next) {
                if (req.url === '/api/list') {
                    res.end(JSON.stringify(data))
                }
                next();
            }
        }))
})
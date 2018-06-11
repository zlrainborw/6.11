var gulp = require('gulp');

var sass = require("gulp-sass");

var autoprefixer = require("gulp-autoprefixer");

var minCss = require("gulp-clean-css");

var uglify = require("gulp-uglify");

var sequence = require("gulp-sequence");

var server = require('gulp-webserver');

var data=require('./src/data/data.json');

gulp.task('css', function () {
    return gulp.src('./src/css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ["last 2 versions", "Android >= 4.0"] }))
        .pipe(minCss())
        .pipe(gulp.dest('build/css'))
});
gulp.task("js", function () {
    return gulp.src(["./src/js/*.js", "!./src/js/*.min.js"])
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))   
});



gulp.task("watch", function () {
    gulp.watch("./src/css/*.scss", ["css"]);
    gulp.watch("./src/js/*.js", ["js"]);
    gulp.watch("./src/*.html", ["html"]);
});
gulp.task('server', function () {
    gulp.src('./src')
        .pipe(server({
            port: 9090,
            open: true,
            middleware: function (req, res, next) {
                if (req.url == '/api/list') {
                    res.end(JSON.stringify(data))
                    // console.log(1)
                }
                next();
            }
        }))
})
gulp.task("default",function(callback){
	sequence(["css","js"],["watch","server"],callback);
});
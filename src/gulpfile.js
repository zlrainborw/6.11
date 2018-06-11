var gulp=require('gulp');

var sass=require('gulp-sass');

// var autofixer=require('gulp-autofixer');

var run=require('gulp-run-dev');

var minCss=require('gulp-clean-css');

var uglify=require('gulp-uglify');

var server=require('gulp-webserver');

gulp.task('css',function(){
    gulp.src('./src')
    .pipe(sass())
    // .pipe(autofixer({

    // }))
    .pipe(minCSS())
    .pipe(gulp.dest('build/css'))
})
gulp
"use strict";

let gulp = require("gulp"),
    gulpLoadPlugins = require('gulp-load-plugins'),
    p = gulpLoadPlugins(),
    del = require('del');
const production = !!p.util.env.production;

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        //.pipe(p.sass().on('error', p.sass.logError))
        .pipe(p.compass({
            css: 'css',
            sass: 'scss',
            image: 'images',
            sourcemap: !production,
            environment: production ? "production" : "development"
        }))
        .pipe(p.if(production, p.cleanCss({compatibility: 'ie9'})))
        .pipe(gulp.dest('./css'));
});


gulp.task("default", ['clean', 'sass', 'script']);

gulp.task("clean", function (){
    return del([
        'dist/*',
        'css/*'
    ])
});

gulp.task("script", function (){
    return gulp.src("./js**/*.js")
        .pipe(p.concat("app.js"))
        .pipe(p.uglify())
        .pipe(gulp.dest("./dist"))
});

gulp.task('watch', ['clean', 'sass', 'script'], function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("./js**/*.js", ['script']);
});
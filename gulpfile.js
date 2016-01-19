var
    gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

gulp.task('clean', function () {
    return gulp
        .src([
            'web/css/*',
            'web/js/*'
        ], {read: false})
        .pipe(rimraf());
});

gulp.task('scss', function () {
    return gulp
        .src([
            'web-src/scss/*.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('web/css'));
});

gulp.task('react', function () {
    return gulp
        .src([
            'bower_components/react/react.min.js',
            'bower_components/react/react-dom.min.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('web/js/'));
});

gulp.task('src-js', function () {
    return gulp.src([
            'web-src/js/*.js',
            'web-src/js/**/*.js'
        ])
        .pipe(gulp.dest('web/js/'));
});

gulp.task('default', ['clean'], function () {
    var tasks = ['react', 'src-js', 'scss'];

    tasks.forEach(function (val) {
        gulp.start(val);
    });
});

gulp.task('watch', ['default'], function () {
    gulp.watch('web-src/js/*.js', ['src-js']);
    gulp.watch('web-src/scss/**/*.scss', ['scss']);
});

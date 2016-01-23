var
    gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass');

gulp.task('clean', function () {
    return gulp
        .src([
            'web/css/*',
            'web/js/*',
            'web/fonts/*',
            'web/images/*'
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

gulp.task('app-js', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        'web-src/js/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('web/js/'));
});

gulp.task('ie-js', function () {
    return gulp.src([
        'bower_components/html5shiv/dist/html5shiv.js',
        'bower_components/respond/dest/respond.src.js'
    ])
        .pipe(concat('ie.js'))
        .pipe(gulp.dest('web/js/'));
});

gulp.task('src-js', function () {
    return gulp.src([
        'web-src/js/**/*.js'
    ])
        .pipe(gulp.dest('web/js/'));
});

gulp.task('fonts', function () {
    return gulp.src([
        'bower_components/bootstrap-sass/assets/fonts/*',
        'web-src/fonts/*'
    ])
        .pipe(gulp.dest('web/fonts'))
});

gulp.task('style-fixes', function () {
    return gulp.src([
        'bower_components/bootstrap-sass/assets/fonts/*',
        'web-src/fonts/*'
    ])
        .pipe(gulp.dest('web/fonts'))
});

gulp.task('images', function () {
    return gulp.src('web-src/images/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('web/images'));
});

gulp.task('default', ['clean'], function () {
    var tasks = ['fonts', 'images', 'app-js', 'src-js', 'scss'];

    tasks.forEach(function (val) {
        gulp.start(val);
    });
});

gulp.task('watch', ['default'], function () {
    gulp.watch('web-src/js/**/*.js', ['src-js']);
    gulp.watch('web-src/scss/**/*.scss', ['scss']);
});

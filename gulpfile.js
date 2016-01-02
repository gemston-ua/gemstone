var
    gulp = require('gulp'),
    del = require('del'),
    concatJs = require('gulp-concat')
    ;

gulp.task('clean', function () {
    return del([
        'web/css/*',
        'web/js/*'
    ]);
});

gulp.task('react', function() {
    return gulp.src([
            'bower_components/react/react.min.js',
            'bower_components/react/react-dom.min.js'
        ])
        .pipe(concatJs('app.js'))
        .pipe(gulp.dest('web/js/'));
});

gulp.task('default', ['clean'],  function() {
    var tasks = ['react'];

    tasks.forEach(function (val) {
        gulp.start(val);
    });
});
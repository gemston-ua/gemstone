var
    gulp = require('gulp'),
    del = require('del')
    ;

gulp.task('clean', function () {
    return del([
        'web/css/*',
        'web/js/*'
    ]);
});

gulp.task('default', ['clean'],  function() {

});

const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('copy', async function () {
    await gulp.src('./src/bin/*').pipe(gulp.dest('lib/src/bin/'));
});

gulp.task('default', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('lib'));
});

gulp.task('watch', () => {
    gulp.watch('./src/*.ts', gulp.series('default', 'copy'));
    gulp.watch('./src/**/*.ts', gulp.series('default', 'copy'));
    gulp.watch('./*.ts', gulp.series('default', 'copy'));
});

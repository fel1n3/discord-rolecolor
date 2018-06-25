var gulp = require('gulp')
var ts = require('gulp-typescript')

gulp.task("default", () => {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outDir: 'bin'
        }))
        .pipe(gulp.dest('bin'))
})
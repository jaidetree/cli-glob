import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import mocha from 'gulp-mocha';

gulp.task('build', ['clean'], () => {
  return gulp.src('src/**.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('clean', () => {
  return del('lib/**');
});

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src('./test.js', { read: false })
    .pipe(mocha({ bail: true, reporter: 'nyan' }));
});

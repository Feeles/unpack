const gulp = require('gulp');
const babel = require('gulp-babel');
const exec = require('child_process').exec;

gulp.task('default', ['watch', 'test']);

gulp.task('watch', function () {

  gulp.watch('src/index.js', ['build', 'test']);

});

gulp.task('build', function () {

  gulp.src('src/index.js')
    .pipe(babel({
      presets: ['es2015', 'stage-3'],
    }))
    .pipe(gulp.dest(''));

});

gulp.task('test', function (cb) {

  exec('node index.js sample/index.json result', function (err, std) {
    if (err) return cb(err);
    if (std) console.log(std);
    cb();
  });

});

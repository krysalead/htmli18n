var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
	del('dist');
});

gulp.task('default', ['build']);

// Task to Minify JS
gulp.task('jsmin', function() {
	return gulp.src('./src/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));
});

// Gulp Build Task
gulp.task('build', function() {
	runSequence('clean', 'jsmin');
});
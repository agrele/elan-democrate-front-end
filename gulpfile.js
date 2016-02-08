var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del');
	debug = require('gulp-debug');

gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts');
});

gulp.task('clean', function() {
	return del(['ressources/rawfiles/', 'ressources/prodfiles/']);
});

gulp.task('styles', function() {
	return sass('ressources/sourcefiles/*.scss', { style: 'expanded' })
		.pipe(debug({title: 'unicorn:'}))
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('ressources/rawfiles/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest('ressources/prodfiles/'))
		.pipe(notify({ message: 'Styles task complete !' }));
});

gulp.task('scripts', function() {
	return gulp.src('ressources/sourcefiles/*.js')
//		.pipe(jshint('.jshintrc'))
//		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('ressources/rawfiles/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('ressources/prodfiles/'))
		.pipe(notify({ message: 'Scripts task complete !' }));
});	

gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('ressources/sourcefiles/*.scss', ['styles']);

	// Watch .js files
//	gulp.watch('src/scripts/**/*.js', ['scripts']);

	// Watch image files
//	gulp.watch('src/images/**/*', ['images']);

});
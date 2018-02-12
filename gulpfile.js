var gulp = require('gulp'),
		twig = require('gulp-twig'),
		sass = require('gulp-sass'),
		csso = require('gulp-csso'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		browserSync = require('browser-sync').create(),
		packageJSON = require('./package.json');


gulp.task('js', function() {

	return gulp.src('src/js/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());

});


gulp.task('sass', function() {

	return gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(csso())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());

});


gulp.task('twig', function() {

	return gulp.src([
		'src/twig/*.twig',
		'!src/twig/_*.twig'
	])
		.pipe(twig({
			data: packageJSON,
			cache: false
		}))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());

});


gulp.task('browser-sync', function(done) {

	browserSync.init({
		logPrefix: 'spiderfingers',
		ui: false,
		server: './',
		startPath: '/dist/index.html',
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
				padding: '4px',
				fontSize: '12px',
				borderBottomLeftRadius: '0'
			}
		}
	});

	done();

});


gulp.task('watch', function() {

	gulp.watch('src/js/*.js', gulp.series('js'));
	gulp.watch('src/sass/*.scss', gulp.series('sass'));
	gulp.watch('src/twig/*.twig', gulp.series('twig'));

});


gulp.task('dev', gulp.parallel(
	'watch',
	'browser-sync'
));


gulp.task('default', gulp.parallel(
	'js',
	'sass',
	'twig',
	'dev'
));

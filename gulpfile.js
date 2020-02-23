// создание переменных
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	plumber = require('gulp-plumber'),
	plumberNotifier = require('gulp-plumber-notifier'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin');

// перезагрузка страницы браузера
gulp.task('browser-sync', function() {
	browserSync.init({
		server: { baseDir: 'app' },
		notify: false
	});
});

// преобразование sass в css
gulp.task('sass', function() {
	return gulp
		.src('app/sass/*.sass')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(
			autoprefixer(['last 4 versions', '> 1%', 'ie 8', 'ie 7'], {
				cascade: false
			})
		)
		.pipe(gulp.dest('app/static/styles'))
		.pipe(browserSync.reload({ stream: true }));
});

// минификация css
gulp.task('minify-css', function() {
	gulp
		.src('app/static/styles/**/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('app/static/styles/'));
});

// наблюдение за изменениями
gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/static/js/**/*.js');
	gulp.watch('app/*.html', browserSync.reload);
});

// почистить кеш
gulp.task('clear', function() {
	return cache.clearAll();
});

// таск по умолчанию
gulp.task('default', ['watch']);

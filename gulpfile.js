var gulp = require('gulp');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');

gulp.task('bundle',function(){
	return browserify({
		entries:'app/main.js',
		debug:true,
	})
	.transform(babelify)
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./app'));
});


gulp.task('observe',function(){
	gulp.watch(['app/**/*.js','!app/app.js'],['bundle']);
});


gulp.task('serve', ['bundle','observe'], function() {
	require('./server/server.js');
});
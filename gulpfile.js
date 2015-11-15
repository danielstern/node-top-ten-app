var gulp = require('gulp');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var spawn = require('child_process').spawn;
var node;

gulp.task('bundle',function(){
	return browserify({
		entries:'app/main.js',
		debug:true,
	})
	.transform(babelify.configure({
	  presets: ["es2015", "react"]
	}))
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./app'));
});


gulp.task('observe',function(){
	gulp.watch(['app/**/*.js','!app/app.js'],['bundle']);
});

gulp.task('serve', ['bundle','observe'],()=>{
	gulp.run('server');

	gulp.watch(['./server/**/*.js'],()=>{gulp.run('server')});
});

gulp.task('server', function() {
	if (node) node.kill()
	  node = spawn('node', ['./server/server.js'], {stdio: 'inherit'})
	  node.on('close', function (code) {
		if (code === 8) {
		  gulp.log('Error detected, waiting for changes...');
		}
	  });

});

process.on('exit', function() {
    if (node) node.kill()
})

// ////////////////////////////////////////////////
// Required Modules
// // /////////////////////////////////////////////

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS = require('gulp-clean-css'),
		include = require("gulp-include"),
		fileinclude = require("gulp-file-include"),
		uglify = require('gulp-uglify'),
		babel = require("gulp-babel"),
		minifyHTML = require('gulp-minify-html-2'),
		imagemin = require('gulp-imagemin'),
		rename = require('gulp-rename'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		watch = require('gulp-watch');

// ////////////////////////////////////////////////
// Preventing Gulp from breaking on error
// // /////////////////////////////////////////////

function onError (error) {
  console.log(error.toString());
  this.emit('end');
}

// ////////////////////////////////////////////////
// Styles Tasks
// // /////////////////////////////////////////////

gulp.task('styles', function(){
	gulp.src('src/sass/**/*.scss')
			.pipe(sass({outputStyle: 'expanded'}))
			.on('error', onError)
			.pipe(autoprefixer('last 9 versions'))
			.pipe(gulp.dest('app/css'))
			.pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// Scripts Tasks
// // /////////////////////////////////////////////

gulp.task('scripts', function(){
	gulp.src('src/js/app.js')
			.pipe(include({
		    extensions: "js",
		    hardFail: true,
		    includePaths: [
		      __dirname + "/src/js/modules", __dirname + "/bower_components", __dirname + "/node_modules"
		    ]
		  }))
		  .pipe(babel({presets: ['es2015']}))
			.on('error', onError)
			.pipe(gulp.dest('app/js'))
			.pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// HTML Task
// // /////////////////////////////////////////////

gulp.task('html', function(){
	gulp.src('src/html/**/*.html')
			.pipe(fileinclude({
	      prefix: '@@',
	      basepath: './src/html/_modules/'
	    }))
			.pipe(gulp.dest('app'))
			.pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// Browser-Sync Task
// // /////////////////////////////////////////////

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});

// ////////////////////////////////////////////////
// Images Task
// // /////////////////////////////////////////////

gulp.task ('images', function(){
	gulp.src('src/img/*')
			.pipe(gulp.dest('app/img'));	
	gulp.src('src/img/ui/*')
			.pipe(gulp.dest('app/img/ui'));	
});


// ////////////////////////////////////////////////
// Watch Task
// // /////////////////////////////////////////////

gulp.task ('watch', function(){
	gulp.watch('src/sass/**/*.scss', ['styles']);
	gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/img/*', ['images']);
});

// ////////////////////////////////////////////////
// Build Task (for production only)
// // /////////////////////////////////////////////

gulp.task('build', function(){
	gulp.src('app/css/**/*.css')
			.pipe(cleanCSS())
			.pipe(gulp.dest('build/css'));
	gulp.src('app/js/**/*.js')
			.pipe(uglify({mangle: false}))
			.pipe(gulp.dest('build/js'));
	gulp.src('app/*.html')
			.pipe(minifyHTML())
			.pipe(gulp.dest('build'));	
	gulp.src('src/img/*')
			.pipe(imagemin())
			.pipe(gulp.dest('build/img'));			
});

// ////////////////////////////////////////////////
// Default Task (for development only)
// // /////////////////////////////////////////////
gulp.task('default', ['styles', 'scripts', 'html', 'images', 'browser-sync', 'watch']);

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
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  watch = require('gulp-watch'),
  browserify = require('gulp-browserify'),
  markdown = require('gulp-marked-json'),
  concat = require('gulp-concat'),
  fs = require('fs'),
  pkg = JSON.parse(fs.readFileSync('./package.json')),
  template = require('gulp-template');
// ////////////////////////////////////////////////
// Preventing Gulp from breaking on error
// // /////////////////////////////////////////////
function onError(error) {
  console.log(error.toString());
  this.emit('end');
}
// ////////////////////////////////////////////////
// Content Task
// // /////////////////////////////////////////////
gulp.task('content', function() {
  gulp.src('src/content/**/*.md')
    .pipe(markdown({
      pedantic: true,
      smartypants: true,
      expand: true
    }))
    .on('error', onError)
    .pipe(gulp.dest('app/js/data'))
    .pipe(reload({
      stream: true
    }));
});
// ////////////////////////////////////////////////
// Styles Tasks
// // /////////////////////////////////////////////
gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on('error', onError)
    .pipe(autoprefixer('last 9 versions'))
    .pipe(rename('style.' + pkg.version + '.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({
      stream: true
    }));
});
// ////////////////////////////////////////////////
// Scripts Tasks
// // /////////////////////////////////////////////
gulp.task('scripts', function() {
  gulp.src(['src/js/modules/*.js', 'src/js/app.js'])
    .pipe(concat('app.js'))
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production,
      alias: {
        "babel-polyfill": './node_modules/babel-polyfill/dist/polyfill.js'
      }
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', onError)
    .pipe(rename('app.' + pkg.version + '.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(reload({
      stream: true
    }));
  gulp.src('src/js/libs/*.js')
    .pipe(concat('lib.js'))
    .on('error', onError)
    .pipe(gulp.dest('app/js/lib'))
    .pipe(reload({
      stream: true
    }));
});
// ////////////////////////////////////////////////
// HTML Task
// // /////////////////////////////////////////////
gulp.task('html', function() {
  gulp.src('src/html/**/*.html')
    .pipe(template({
      version: pkg.version
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/html/_modules/'
    }))
    .on('error', onError)
    .pipe(gulp.dest('app'))
    .pipe(reload({
      stream: true
    }));
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
gulp.task('images', function() {
  gulp.src('src/img/*')
    .pipe(gulp.dest('app/img'));
  gulp.src('src/img/ui/*')
    .pipe(gulp.dest('app/img/ui'));
});
// ////////////////////////////////////////////////
// Watch Task
// // /////////////////////////////////////////////
gulp.task('watch', function() {
  gulp.watch('src/content/**/*.md', ['content']);
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/img/*', ['images']);
});
// ////////////////////////////////////////////////
// Build Task (for production only)
// // /////////////////////////////////////////////
gulp.task('build', function() {
  gulp.src('app/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('docs/css'));
  gulp.src('app/js/data/*.json')
    .pipe(gulp.dest('docs/js/data'));
  gulp.src('app/js/**/*.js')
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest('docs/js'));
  gulp.src('app/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('docs'));
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('docs/img'));
});
// ////////////////////////////////////////////////
// Default Task (for development only)
// // /////////////////////////////////////////////
gulp.task('default', ['content', 'styles', 'scripts', 'html', 'images', 'browser-sync', 'watch']);
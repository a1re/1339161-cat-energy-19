'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglifyjs');
var sourcemap = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var less = require('gulp-less');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var posthtml = require('gulp-posthtml');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var server = require('browser-sync').create();
var del = require('del');
var include = require('posthtml-include');

gulp.task('css', function () {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('png-jpg-svg', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function() {
  return gulp.src('source/img/inline-*.svg')
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('images', gulp.series('webp', 'png-jpg-svg', 'sprite'));

gulp.task('js', function () {
  return gulp.src('source/js/**/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/*.ico',
      'source/img/adaptive-logo.svg',
      'source/*.html',
      'source/site.webmanifest',
      'source/favicon.ico'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series(
  'clean',
  'images',
  'js',
  'copy',
  'css',
  'html'
));

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/less/**/*.less', gulp.series('css'));
  gulp.watch('source/img/inline-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/js/**/*.js', gulp.series('js', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('start', gulp.series('build', 'server'));

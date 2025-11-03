const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const flatten = require('gulp-flatten');
const browserSync = require('browser-sync').create();

function copyHTMLTask() {
  return src('./src/index.html').pipe(dest('./dist'));
}

function copyFontsTask() {
  return src('./src/fonts/*/*.*', { encoding: false }).pipe(flatten()).pipe(dest('./dist/fonts/'));
}

function copyIMGTask() {
  return src('./src/img/**/*.*', { encoding: false }).pipe(dest('./dist/img'));
}

function copyJSTask() {
  return src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    './node_modules/slick-carousel/slick/slick.min.js',
    './src/js/*.js',
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/js'));
}

function copyCSSTask() {
  return src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    // './node_modules/slick-carousel/slick/slick.min.js',
    './src/scss/**/*.scss',
  ])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css'));
}

function buildTask() {
  return parallel(copyFontsTask, copyIMGTask, copyHTMLTask, copyCSSTask, copyJSTask);
}

function runServerTask(done) {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  watch('./src/index.html', series(copyHTMLTask, reloadServerTask));
  watch('./src/js/*.js', series(copyJSTask, reloadServerTask));
  watch('./src/scss/**/*.scss', series(copyCSSTask, reloadServerTask));
  watch('./src/img/**/*.*', series(copyIMGTask, reloadServerTask));
  watch('./src/fonts/**/*.*', series(copyFontsTask, reloadServerTask));

  done();
}

function reloadServerTask(done) {
  browserSync.reload();
  done();
}

module.exports = {
  build: buildTask(),
  start: series(buildTask(), runServerTask),
};

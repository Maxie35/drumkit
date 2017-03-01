const babel = require('gulp-babel'),
      browserSync = require('browser-sync').create(),
      del = require('del'),
      gulp = require('gulp'),
      imagemin = require('gulp-imagemin'),
      sass = require ('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      webpackStream = require('webpack-stream'),
      webpack = require('webpack'),
      webpackConfig = require('./webpack.config');

// File paths are set here
const dev = './src',
      devJsFiles = `${dev}/js/**/*.js`,
      devJsEntry = `${dev}/js/main.js`,
      devScssEntry = `${dev}/scss/style.scss`,
      devScssFiles = `${dev}/scss/**/*.scss`,
      devHtmlFiles = `${dev}/html/**/*.html`,
      devFontFiles = `${dev}/fonts/**/*`,
      devImageFiles = `${dev}/img/**/*`,

      build = './build',
      buildScssDirectory = `${build}/css/`,
      buildJsDirectory = `${build}/js/`,
      buildHtmlDirectory = build,
      buildFontsFiles = `${build}/fonts`,
      buildImagesFiles = `${build}/img`;

gulp.task('default', ['build', 'watch', 'serve'])

gulp.task('build', ['scss', 'js', 'html', 'fonts', 'images'])

gulp.task('watch', function () {
  gulp.watch(devScssFiles, ['scss'])
  gulp.watch(devJsFiles, ['js:watch'])
  gulp.watch(devHtmlFiles, ['html:watch'])
})

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './build/',
      proxie: 'localhost'
    }
  })
})

gulp.task('scss', function () {
  return gulp.src(devScssEntry)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(buildScssDirectory))
    .pipe(browserSync.stream())
})

gulp.task('js', function () {
  return gulp.src(devJsEntry)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(buildJsDirectory))
})

gulp.task('js:watch', ['js'], function (done) {
  browserSync.reload()
  done()
})

gulp.task('html', function () {
  gulp.src(devHtmlFiles)
    .pipe(gulp.dest(buildHtmlDirectory))
})

gulp.task('html:watch', ['html'], function (done) {
  browserSync.reload()
  done()
})

gulp.task('fonts', function () {
  gulp.src(devFontFiles)
    .pipe(gulp.dest(buildFontsFiles))
})

gulp.task('images', function () {
  gulp.src(devImageFiles)
    .pipe(imagemin())
    .pipe(gulp.dest(buildImagesFiles))
})

gulp.task('clean', function () {
  return del([
    `${build}/**/*`
  ])
})
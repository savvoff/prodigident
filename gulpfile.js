/*jslint node: true */
"use strict";

const $ = require('gulp-load-plugins')(),
      argv = require('yargs').argv,
      gulp = require('gulp'),
      path = require('path'),
      browserSync = require('browser-sync').create(),
      merge = require('merge-stream'),
      sequence = require('run-sequence'),
      del = require('del'),
      sass = require('gulp-dart-sass'),
      //   colors = require('colors'),
      //   image = require('gulp-image'),
      //   svgSprite = require('gulp-svg-sprite'),
      //   cleanCSS = require('gulp-clean-css'),
      //   babel = require('gulp-babel'),
      uglify = require('gulp-uglify-es').default,
      //   notify = require('gulp-notify'),
      //   More info about Wiredep config: https://github.com/taptapship/wiredep
      wiredep = require('wiredep')({
        directory: './bower_components',
        exclude: ['flickity']
    });

// Enter URL of your local server here
// Example: 'http://localwebsite.dev'
const URL = 'http://prodigident.loc';

// Check for --production flag
const isProduction = !!(argv.production);

// Browsers to target when prefixing CSS.
const COMPATIBILITY = [
  'last 2 versions',
  'ie >= 11',
  'Android >= 2.3'
];

// Sprite config
const spriteCfg = {
    mode: {
      symbol: {
        dest: ''
      } // Activate the «symbol» mode
    }
  };

// File paths to various assets are defined here.
const PATHS = wiredep;
console.log(PATHS);

// Add custom JS
PATHS.js.push(
  'assets/src/javascript/modules/*.js',
  'assets/src/javascript/app.js'
);

// Browsersync task
gulp.task('browser-sync', ['build'], function () {

    let files = [
        '**/*.html',
        'assets/dist/images/**/*.{png,jpg,jpeg,gif}'
    ];

    browserSync.init(files, {
        // Proxy address
        proxy: URL
    });
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function () {
  setTimeout(function () {
    return gulp.src('assets/src/scss/app.scss')
      .pipe($.sourcemaps.init())
      .pipe(sass({
          outputStyle: 'expanded',
          includePaths: PATHS.css
      }))
      .on('error', $.notify.onError({
          message: "<%= error.message %>",
          title: "Sass Error"
      }))
      .pipe($.autoprefixer({
          browsers: COMPATIBILITY
      }))
      .pipe($.cleanCss())
      .pipe($.if(!isProduction, $.sourcemaps.write('.')))
      .pipe(gulp.dest('assets/dist/css'))
      .pipe(browserSync.stream({match: '**/*.css'}))
      .pipe($.notify('Compiled: SCSS'));
    }, 500);
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function () {
  let uglifyES = uglify()
    .on('error', $.notify.onError({
      message: "<%= error.message %>",
      title: "Uglify JS Error"
    }));
  return gulp.src(PATHS.js)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js', {
        newLine: '\n;'
    }))
    .pipe($.if(isProduction, uglifyES))
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('assets/dist/javascript'))
    .pipe(browserSync.stream())
    .pipe($.notify('Compiled: Javascript'));
});

// SVG sprite
gulp.task('sprite', function () {
  return gulp.src('assets/src/images/svg/*.svg')
    .pipe($.svgSprite(spriteCfg))
    .pipe(gulp.dest('assets/dist/images'))
    .pipe($.notify('Compiled: Sprites'))
    .on('error', $.notify.onError({
      message: "<%= error.message %>",
      title: "Sprite Error"
    }));
});

// Compress images
gulp.task('image', function () {
  return gulp.src('assets/src/images/**/*.{png,jpg,jpeg,gif}')
    .pipe($.image({
      pngquant: ['--quality', '60-75'],
      mozjpeg: ['-quality', 60]
    }))
    .pipe(gulp.dest('assets/dist/images'))
    .pipe($.notify('Compressed: Images'));
});

// Copy task
gulp.task('copy', function () {
  // Images copy
  // let images = gulp.src('assets/src/images/*.{png,jpg,gif,svg}')
  //   .pipe(browserSync.stream())
  //   .pipe(gulp.dest('assets/dist/images/'));

  // let fonts = gulp.src('assets/src/fonts/*.*')
  //   .pipe(gulp.dest('assets/dist/fonts/'));

  // return merge(fonts);
});


// Build task
// Runs copy then runs sass & javascript in parallel
gulp.task('build', ['clean'], function (done) {
  sequence('copy',
    ['sass', 'javascript', 'sprite'],
    done);
});

// Clean task
gulp.task('clean', function (done) {
  sequence(['clean:javascript', 'clean:css', 'clean:sprite'],
    done);
});

// Clean JS
gulp.task('clean:javascript', function () {
  return del([
    'assets/dist/javascript/app.js'
  ]);
});

// Clean CSS
gulp.task('clean:css', function () {
  return del([
    'assets/dist/css/style.css',
    'assets/dist/css/style.css.map'
  ]);
});

// Clean SVG sprite
gulp.task('clean:sprite', function () {
    return del([
      'assets/dist/images/svg/*.svg'
    ]);
});

// Default gulp task
// Run build task and watch for file changes
gulp.task('default', ['build', 'browser-sync'], function () {
  // Log file changes to console
  function logFileChange(event) {
    let fileName = path.relative(__dirname, event.path);
    console.log('[' + 'WATCH'.green + '] ' + fileName.magenta + ' was ' + event.type + ', running tasks...');
  }

  // Sass Watch
  gulp.watch(['assets/src/scss/**/*.scss'], ['clean:css', 'sass'])
    .on('change', function (event) {
      logFileChange(event);
    });

  // JS Watch
  gulp.watch(['assets/src/javascript/**/*.js'], ['clean:javascript', 'javascript'])
    .on('change', function (event) {
      logFileChange(event);
    });

  // Spite Watch
  gulp.watch(['assets/src/images/svg/*.svg'], ['clean:sprite', 'sprite'])
    .on('change', function (event) {
      logFileChange(event);
    });

  // Images Watch
  gulp.watch(['assets/src/images/**/*.{png,jpg,jpeg,gif}'], ['image'])
    .on('change', function (event) {
      logFileChange(event);
    });

});

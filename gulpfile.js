'use strict'

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Copy All HTML files
gulp.task('copyHtml', function(){
  gulp.src('src/*.html')
      .pipe(gulp.dest('public'));
});

// Copy Icons
gulp.task('copyIcons', function(){
  gulp.src('node_modules/ionicons/dist/css/ionicons.min.css*')
      .pipe(gulp.dest('public/css/'));
})

// Copy Ionicon icon fonts
gulp.task('copyIoniconFonts', function(){
  gulp.src('node_modules/ionicons/dist/fonts/*')
      .pipe(gulp.dest('public/fonts/'));
})

// Copy Bootstrap icons
gulp.task('copyBootstrapFonts', function(){
  gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
      .pipe(gulp.dest('public/fonts/bootstrap'));
})

// Copy Bootstrap js
gulp.task('copyBootstrapJS', function(){
  gulp.src('node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')
      .pipe(gulp.dest('public/js/'));
})

// Copy jQuery js
gulp.task('copyjQueryJS', function(){
  gulp.src('node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('public/js/'));
})

// Copy Handlebars js
gulp.task('copyHandlebarsJS', function(){
  gulp.src('node_modules/handlebars/dist/handlebars.min.js')
      .pipe(gulp.dest('public/js/'));
})

// Optimize Images
gulp.task('imageMin', () =>
	gulp.src('src/img/*')
		.pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: true}]
    }))
		.pipe(gulp.dest('public/img/'))
);

// Compile Sass
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('public/css'));
});

// Scripts
gulp.task('scripts', function(){
  // Minify and copy
  gulp.src('src/js/*')
      .pipe(concat('script.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['copyHtml', 'copyIcons', 'copyIoniconFonts', 'copyBootstrapJS', 'copyBootstrapFonts', 'copyjQueryJS', 'copyHandlebarsJS', 'imageMin', 'sass', 'scripts']);

gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/img/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']);
  gulp.watch('node_modules/ionicons/dist/*', ['copyIcons', 'copyIoniconFonts']);
  gulp.watch('node_modules/handlebars/*', ['copyHandlebarsJS']);
  gulp.watch('node_modules/bootstrap-sass/assets/*', ['copyBootstrapJS', 'copyBootstrapFonts']);
  gulp.watch('node_modules/jquery/dist/*', ['copyjQueryJS']);
});
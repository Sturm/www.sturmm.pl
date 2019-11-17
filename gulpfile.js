let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let concat = require('gulp-concat');
let htmlReplace = require('gulp-html-replace');
let htmlMin = require('gulp-htmlmin');
let cleanCSS = require('gulp-clean-css');
let babel = require('gulp-babel'); // requires babel-preset-es2015
let uglify = require('gulp-uglify-es').default;

gulp.task('serve', ['sass'], () => {
    browserSync({
        server: 'src'
    });
    gulp.watch('src/*.html', () => browserSync.reload());
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', () => browserSync.reload());
});

gulp.task('sass', () => gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 versions', 'Firefox > 20']
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream()));

gulp.task('css', () => gulp.src('src/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css')));

gulp.task('js', () => gulp.src('src/js/**/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js')));

gulp.task('html', () => gulp.src('src/*.html')
    .pipe(htmlReplace({
        'css': 'css/style.css',
        'js': 'js/script.js'
    }))
    .pipe(htmlMin({
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true,
    }))
    .pipe(gulp.dest('dist/')));

gulp.task('build', ['css', 'js', 'html']);

gulp.task('default', ['serve']);
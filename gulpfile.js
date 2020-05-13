var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var uglify = require('gulp-uglify-es').default;
var webp = require('gulp-webp');


gulp.task('scss', function () {
    return gulp.src('app/scss/**/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css'
    ])
        .pipe(concat('libs.scss'))
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('libs', function (){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('js'))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('clean', async function () {
    del.sync('dist')
})

gulp.task('export', function () {
    var buildHtml = gulp.src('app/**/*html')
        .pipe(gulp.dest('dist'))

    var buildCss = gulp.src('app/css/**/*css')
        .pipe(gulp.dest('dist/css'))

    var buildJs = gulp.src('app/js/**/*js')
        .pipe(gulp.dest('dist/js'))

    var buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))

    var webp = gulp.src('app/images/*.{webp,ico}')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('images', function () {
    return gulp.src('app/images/*.{png,jpg}')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { removeUnusedNS: false },
                    { removeUselessStrokeAndFill: false },
                    { cleanupIDs: false },
                    { removeComments: true },
                    { removeEmptyAttrs: true },
                    { removeEmptyText: true },
                    { collapseGroups: true }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/js/min'))
})

gulp.task('sprite', function () {
    return gulp.src("app/images/icons/*.svg")
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true,
            removeViewBox: false
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("app/images/icons"))
});

gulp.task('svg', function () {
    return gulp.src('app/images/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('webp', function () {
    return gulp.src('app/images/*.{png,jpg}')
        .pipe(webp({ quality: 90 }))
        .pipe(gulp.dest('app/images'))
        .pipe(browserSync.reload({ stream: true }))
});



gulp.task('build', gulp.series('clean', 'images', 'script', 'svg', 'export'));

gulp.task('default', gulp.parallel('css', 'scss', 'libs', 'js', 'browser-sync', 'watch'));
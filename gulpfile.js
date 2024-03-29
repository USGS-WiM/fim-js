'use strict';
// Generated on 2016-07-06 using generator-wim 0.0.1

var gulp = require('gulp');
var open = require('open');
var del = require('del');
var less = require('gulp-less');
var wiredep = require('wiredep').stream;

// Browser sync
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

// Load plugins
var $ = require('gulp-load-plugins')();

//copy leaflet images


//less compilation
gulp.task('less', function () {
    return gulp.src(['src/bower_components/wim-mapper-styles/less/base.less'])
        .pipe(less())
        .pipe(gulp.dest('src/styles'))
        .pipe(gulp.dest('build/styles'))
});

// Styles
gulp.task('styles', function () {
    return gulp.src(['src/styles/main.css'])
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('src/styles'))
        .pipe($.size());
});

// Icons
gulp.task('icons', function () {
    return gulp.src(['src/bower_components/bootstrap/dist/fonts/*.*'])
        .pipe(gulp.dest('build/fonts'));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src(['src/scripts/**/*.js'])
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .pipe($.size());
});

// HTML
gulp.task('html', ['styles', 'scripts', 'icons'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('src/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        //.pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('build'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src([
        'src/images/**/*',
        'src/lib/images/*'])
        .pipe(gulp.dest('build/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function (cb) {
    del([
        'build/styles/**',
        'build/scripts/**',
        'build/images/**',
    ], cb);
});

// Build
gulp.task('build', ['html', 'images', 'less']);

// Default task
//make sure download-esri-api (if needed) is run just after clean, but before build
//gulp.task('default', ['clean', 'download-esri-api'], function () {
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Run Bukld
gulp.task('connectBuild', function(){
    $.connect.server({
        root: 'src',
        port: 9000,
        livereload: true
    });
});

// Open
gulp.task('serve-build', ['connectBuild'], function() {
    open("http://localhost:9000");
});


// Connect
gulp.task('connect', function(){
    $.connect.server({
        root: 'src',
        port: 9000,
        livereload: true
    });
});

// Open
gulp.task('serve', ['connect'], function() {
    open("http://localhost:9000");
});

// Inject Bower components
gulp.task('wiredep', function () {
    gulp.src('src/styles/*.css')
        .pipe(wiredep({
            directory: 'src/bower_components',
            ignorePath: 'src/bower_components/'
        }))
        .pipe(gulp.dest('src/styles'));

    gulp.src('src/*.html')
        .pipe(wiredep({
            directory: 'src/bower_components',
            ignorePath: 'src/'
        }))
        .pipe(gulp.dest('src'));
});

// Watch
gulp.task('watch', ['less', 'connect', 'serve'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'src/*.html',
        'src/styles/**/*.css',
        'src/**/*.less',
        'src/scripts/**/*.js',
        'src/images/**/*'
    ], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });

    gulp.watch("./src/**/*.less", ['sync-styles']);

    // Watch .css files
    gulp.watch('src/styles/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/images/**/*', ['images']);

    // Watch bower files
    gulp.watch('bower.json', ['wiredep']);
});


// Browsersync
// alternative to regular server
// After running Browsersync, run regular gulp and gulp build to make sure less changes built
gulp.task('bs', function(){

   browserSync.init({
    server: "./src/"
   });  

   gulp.watch("./src/**/*.less", ['sync-styles']);

//    Build CSS?
    // gulp.watch('src/styles/**/*.css', ['styles']);



   gulp.watch("./src/**/*.html").on("change", reload);
   gulp.watch("./src/**/*.js").on("change", reload);

    
});

// Compile LESS to CSS then inject without reload
// Compile LESS to CSS then inject without reload
// Compile LESS to CSS then inject without reload
gulp.task('sync-styles', function(){

    gulp.src('./src/styles/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('./src/styles/'))
        .pipe(browserSync.stream());

});
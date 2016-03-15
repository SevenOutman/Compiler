/**
 * Created by Doma on 15/12/23.
 */
var gulp = require('gulp');

// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dest'))
        .pipe(notify({message: 'html task ok'}));

});

// 检查js
gulp.task('lint', function () {
    return gulp.src([
            "js/Benchmark.js",
            "js/include.js",
            "lib/toy.js",
            "lib/console.js",
            "js/PubSub.js",
            "js/Storage.js",
            "js/Cache.js",
            "js/ToyFile.js",
            "js/View.js",
            "js/Paxer.js",
            "js/Semantic.js",
            "js/script.js"
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({message: 'lint task ok'}));
});

// 合并、压缩js文件
gulp.task('js', function () {
    return gulp.src([
            "js/Benchmark.js",
            "js/include.js",
            "js/ViewModels.js",
            "lib/toy.js",
            "lib/console.js",
            "js/PubSub.js",
            "js/Storage.js",
            "js/Cache.js",
            "js/ToyFile.js",
            "js/View.js",
            "js/Paxer.js",
            "js/Semantic.js",
            "js/script.js"
        ])
        .pipe(concat('compiler.bundle.js'))
        .pipe(gulp.dest('dest/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'));
});

gulp.task('css', function() {
    return gulp.src('css/compiler.bundle.css')
        //.pipe(concat('main.css'))
        .pipe(gulp.dest('dest/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dest/css'));
});

gulp.task('default', function () {
    gulp.run('lint', 'js', 'html', 'css');

    // 监听html文件变化
    gulp.watch('index.html', function () {
        gulp.run('html');
    });

    // Watch .js files
    gulp.watch([
        "js/Benchmark.js",
        "js/include.js",
        "js/ViewModels.js",
        "lib/toy.js",
        "lib/console.js",
        "js/PubSub.js",
        "js/Storage.js",
        "js/Cache.js",
        "js/ToyFile.js",
        "js/View.js",
        "js/Paxer.js",
        "js/Semantic.js",
        "js/script.js"
    ], ['js']);
});
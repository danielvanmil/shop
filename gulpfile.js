var gulp = require('gulp');
var war = require("gulp-war");
var zip = require("gulp-zip");

//var vulcanize = require('gulp-vulcanize');
//var polymerbuild = require('polymer-build');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('war', function () {
    gulp.src(["./build/bundled/**/*"])
        .pipe(war({
            welcome: 'index.html',
            displayName: 'Shop war',
        }))
        .pipe(zip('shop.war'))
        .pipe(gulp.dest("./dist"));
 
});

//gulp.task('default', ['polymerbuild', 'war']);

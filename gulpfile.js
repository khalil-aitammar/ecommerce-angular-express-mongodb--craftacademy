var gulp = require('gulp'),
    nodedemon = require('gulp-nodemon');

gulp.task('default', function () {
   nodedemon({
       script:'app.js',
       ext:'js',
       env: {
           PORT:8000
       },
       ignore:['./node_modules/**']
   })
    .on('restart',function () {
        console.log('restarting');
    });
});


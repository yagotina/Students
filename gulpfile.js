const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();

const clean = () => del(["dist"]);

const transferFiles = cb => {
    src('src/*.html')
      .pipe(dest('dist'));

    src(['src/css/style.css'])
      .pipe(dest('dist/css/'));
  
    src(['src/js/*'])
      .pipe(dest('dist/js/'));
  
    cb();
};

const watchFiles = cb => {
    watch(["./src/*/*"]).on('change', browserSync.reload);

    cb();
};

const browser = () => {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
};

exports.default = series(clean, transferFiles, parallel(watchFiles, browser));
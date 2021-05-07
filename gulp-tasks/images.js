"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import imagemin from "gulp-imagemin";
// import imageminPngquant from "imagemin-pngquant";
// import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminGiflossy from "imagemin-giflossy";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
  production = !!argv.production;

gulp.task("images", () => {
  return gulp
    .src(paths.images.src)
    .pipe(
      gulpif(
        production,
        imagemin(
          [
            imageminGiflossy({
              optimizationLevel: 3,
              optimize: 3,
              lossy: 2,
            }),

            imageminMozjpeg({
              progressive: true,
              quality: 80,
            }),
            imagemin.svgo({
              plugins: [
                { removeViewBox: true },
                { removeUnusedNS: false },
                { removeUselessStrokeAndFill: false },
                { cleanupIDs: false },
                { removeComments: true },
                { removeEmptyAttrs: true },
                { removeEmptyText: true },
                { collapseGroups: true },
              ],
            }),
          ],
          {
            verbose: true,
          },
        ),
      ),
    )
    .pipe(gulp.dest(paths.images.dist))
    .pipe(
      debug({
        title: "Images",
      }),
    )
    .on("end", browsersync.reload);
});

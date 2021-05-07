"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
import autoprefixer from "autoprefixer";
import animation from "postcss-animation";
import cssnano from "cssnano";
import postcss from "gulp-postcss";

const argv = yargs.argv,
  production = !!argv.production;

gulp.task("styles", () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      gulpif(
        !production,
        postcss([
          animation,
          autoprefixer({ overrideBrowserslist: ["last 1 version"] }),
        ]),
      ),
    )
    .pipe(
      gulpif(
        production,
        postcss([
          animation,
          autoprefixer,
          cssnano({
            preset: "default",
          }),
        ]),
      ),
    )
    .pipe(plumber.stop())
    .pipe(gulpif(!production, sourcemaps.write("./maps/")))
    .pipe(
      gulpif(
        production,
        rename({
          suffix: ".min",
        }),
      ),
    )
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(
      debug({
        title: "CSS files",
      }),
    )
    .pipe(browsersync.stream());
});

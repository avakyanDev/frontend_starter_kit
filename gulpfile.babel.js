"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
  paths = {
    views: {
      src: ["./src/views/index.pug", "./src/views/pages/*.pug"],
      dist: "./dist/",
      watch: ["./src/blocks/**/*.pug", "./src/views/**/*.pug"],
    },
    styles: {
      src: "./src/styles/main.{scss,sass}",
      dist: "./dist/assets/css/",
      watch: ["./src/blocks/**/*.{scss,sass}", "./src/styles/**/*.{scss,sass}"],
    },
    scripts: {
      src: "./src/js/index.js",
      dist: "./dist/assets/js/",
      watch: ["./src/blocks/**/*.js", "./src/js/**/*.js"],
    },
    images: {
      src: ["./src/images/**/*.{jpg,jpeg,png,gif,tiff,svg}"],
      dist: "./dist/assets/images/",
      watch: "./src/images/**/*.{jpg,jpeg,png,gif,svg}",
    },
    webp: {
      src: ["./src/images/**/*.{jpg,jpeg,png,tiff}"],
      dist: "./dist/assets/images/",
      watch: ["./src/images/**/*.{jpg,jpeg,png,tiff}"],
    },
    fonts: {
      src: "./src/fonts/**/*.{woff,woff2}",
      dist: "./dist/assets/fonts/",
      watch: "./src/fonts/**/*.{woff,woff2}",
    },
    favicons: {
      src: "./src/favicon.{jpg,jpeg,png,gif,tiff}",
      dist: "./dist/",
    },
  };

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series(
  "clean",
  gulp.parallel([
    "views",
    "styles",
    "scripts",
    "images",
    "webp",
    "fonts",
    "favicons",
  ]),
  gulp.parallel("serve"),
);

export const prod = gulp.series(
  "clean",
  gulp.series([
    "views",
    "styles",
    "scripts",
    "images",
    "webp",
    "fonts",
    "favicons",
  ]),
);

export default development;

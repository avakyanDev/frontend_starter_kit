module.exports = {
  syntax: "scss",
  extends: ["stylelint-config-rational-order", "stylelint-config-prettier"],
  plugins: [
    "stylelint-order",
    "stylelint-scss",
    "stylelint-selector-bem-pattern",
  ],
};

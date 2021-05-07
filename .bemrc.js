module.exports = {
  root: true,
  modules: {
    'bem-tools': {
      plugins: {
        create: {
          techs: ['pug', 'scss', 'js'],
          techsTemplates: {
            js: '.bem/templates/js.js',
            scss: '.bem/templates/css.js',
          },
          levels: {
            'src/blocks/modules': {
              default: true,
            },
          },
        },
      },
    },
  },
};

module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      '!src/**/*.spec.js'
    ],

    tests: [
      'src/**/*.spec.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    testFramework: 'ava',
    setup: function () {
      const
        {JSDOM} = require('jsdom');

      global.window = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>').window;
      global.document = global.window.document;
      global.navigator = global.window.navigator;
    },
    debug: true
  }
}
'use strict';
var grunt = require('grunt');
module.exports = function ( karma ) {
  karma.set({
    basePath: '.',
    files: [
      "lib/angular/angular.js",
      "lib/angular-mocks/angular-mocks.js",
      "dist/angularjs-graphite.js",
      "test/**/*spec.js"
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-coverage', 'karma-phantomjs-launcher'],
    logLevel:  'DEBUG',
    reporters: ['dots', 'coverage'],
    preprocessors: {
      'dist/**/*.js': 'coverage'
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    port: 7019,
    urlRoot: '/',
    autoWatch: false,
    browsers: [
      'PhantomJS'
    ],
    client: {
      args: ['--web-security', 'false']
    }
  });
};
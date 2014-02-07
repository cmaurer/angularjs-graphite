'use strict';
var grunt = require('grunt');
module.exports = function ( karma ) {
  karma.set({
    basePath: '.',
    files: [
      "http://code.angularjs.org/1.2.11/angular.js",
      "http://code.angularjs.org/1.2.11/angular-mocks.js",
      "src/namespace.js",
      "src/factories/graphite-api-format-factory.js",
      "src/providers/graphite-api-provider.js",
      "test/**/*spec.js"
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-coverage', 'karma-phantomjs-launcher'],
    logLevel:  'DEBUG',
    reporters: ['dots', 'coverage'],
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/**/*.js': ['coverage']
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
    ]
  });
};
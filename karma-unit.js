'use strict';
var grunt = require('grunt');
module.exports = function ( karma ) {
  karma.set({
    basePath: '.',
    files: [
      "http://code.angularjs.org/1.2.10/angular.js",
      "http://code.angularjs.org/1.2.10/angular-mocks.js",
      "src/**/*.js",
      "test/**/*spec.js"
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-coverage', 'karma-phantomjs-launcher'],
    logLevel:  'DEBUG',
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    port: 7019,
    urlRoot: '/',
    autoWatch: false,
    browsers: [
      'PhantomJS'
    ]
  });
};
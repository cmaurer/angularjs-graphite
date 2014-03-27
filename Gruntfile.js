/*global module:false*/
var qs = require('qs'), mockGraphite = require('./test/graphite/graphite.mock.server.js');

module.exports = function (grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    clean: ['dist/', 'coverage/', 'docs/', 'generated/'],
    ngmin: {
      directives: {
        expand: true,
        cwd: 'src',
        src: [
          'namespace.js',
          'factories/graphite-api-format-factory.js',
          'factories/graphite-api-target-factory.js',
          'providers/graphite-api-provider.js',
          'services/graphite-find-service.js',
          'services/graphite-date-parser-service.js'
        ],
        dest: 'generated'
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      js: {
        src: [
          'generated/namespace.js',
          'generated/services/graphite-date-parser-service.js',
          'generated/providers/graphite-api-provider.js',
          'generated/factories/graphite-api-format-factory.js',
          'generated/factories/graphite-api-target-factory.js',
          'generated/services/graphite-find-service.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    jshint: {
      options: {
        jshintrc: true,
        force: true
      },
      afterconcat: ['dist/angularjs-graphite.js']
    },
    karma: {
      unit: {
        configFile: 'karma-unit.js'
      },
      continuous: {
        configFile: 'karma-unit.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    coveralls: {
      options: {
        debug: true,
        coverage_dir: 'coverage/',
        force: true
      }
    },
    jsbeautifier : {
      files : ['dist/angularjs-graphite.js'],
      options : {
        js: {
          evalCode: true,
          indentSize: 2,
          indentChar: ' ',
          spaceInParen: true,
          jslintHappy: true,
          indentLevel: 0
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      min: {
        files: {
          'dist/angularjs-graphite.min.js': ['dist/angularjs-graphite.js']
        }
      }
    },
    changelog: {
      options: {
        after: '2014-01-01',
        fixRegex: /^(.*)$/gim
      }
    },
    ngdocs: {
      options: {
        dest: 'docs',
        scripts: ['angular.js', 'dist/angularjs-graphite.js']
      },
      all: ['src/**/*.js']
    },
    copy: {
      main: {
        files: [
          {src: ['dist/angularjs-graphite.js'],
            dest: 'app/js/', filter: 'isFile'}
        ]
      }
    },
    connect: {
      web: {
        options: {
          port: 9000,
          base: 'app',
          keepalive: false
        }
      },
      graphite: {
        options: {
          port: 9001,
          keepalive: false,
          middleware: [
            function query(req, res, next){
              if (!req.query) {
                req.query = ~req.url.indexOf('?')
                  ? qs.parse(req.url.split('?')[1])
                  : {};
              }
              next();
            },
            function graphite(req, res, next) {
              if(req.url.indexOf('/render') <= -1) return next();
              mockGraphite.render(req, function(err, response){
                if(err){
                  return res.end(500, err);
                }
                return res.end(JSON.stringify(response));
              });
            }
          ]
        }
      }
    },
    protractor: {
      options: {
        configFile: "node_modules/protractor/referenceConf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      protractor_test: {
        options: {
          configFile: "protractor.conf.js",
          args: {
            verbose: true
          }
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-changelog');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-selenium-webdriver');

  // Default task.
  grunt.registerTask('default', ['clean', 'ngmin', 'concat', 'jsbeautifier', 'jshint', 'karma:continuous', 'uglify']);
  grunt.registerTask('docs', ['clean', 'ngmin', 'concat', 'ngdocs']);
  grunt.registerTask('test', ['copy', 'selenium_phantom_hub', 'connect', 'protractor', 'selenium_stop']);
  grunt.registerTask('travis', ['clean', 'ngmin', 'concat', 'jsbeautifier', 'jshint', 'karma:continuous', 'coveralls', 'uglify']);


  /**
   * function(connect, options, middlewares) {

            middlewares.push(function(req, res, next) {

              console.log('req', req.url);
              if (req.url.indexOf('/render') <= -1) return next();

              return mockGraphite.render(req, function(err, response){
                if(err){
                  return res.end(500, err);
                }
                return res.end(response.statusCode, response);
              });
            });
            return middlewares;
          }
   */

};

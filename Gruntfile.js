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
    clean: ['dist/', 'coverage/', 'docs/', 'generated/', '_book'],
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
          repository: 'https://github.com/cmaurer/angularjs-graphite'
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
    portPick: {
      options: {
        port: 7654
      },
      selenium_phantom_hub:{
        targets: [
          'selenium_phantom_hub.options.port'
        ]
      },
      server: {
        targets: [
          'connect.server.options.port'
        ]
      },
      www: {
        targets: [
          'connect.www.options.port'
        ]
      }
    },
    selenium_phantom_hub: {
      options: {
        timeout: 180,
        port: -1
      }
    },
    connect: {
      www: {
        options: {
          port: -1,
          base: 'app',
          keepalive: false
        }
      },
      server: {
        options: {
          port: -1,
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
              res.setHeader("Access-Control-Allow-Origin", "*");
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
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
        }
      },
      protractor_test: {
        options: {
          configFile: "protractor.conf.js",
          args: {
            seleniumPort: '<%= grunt.config.get("selenium_phantom_hub.options.port") %>',
            baseUrl: 'http://localhost:<%= grunt.config.get("connect.www.options.port") %>',
            seleniumAddress: 'http://localhost:<%= grunt.config.get("selenium_phantom_hub.options.port") %>/wd/hub',
            capabilities: {
              'browserName': 'phantomjs'
            },
            verbose: true,
            debug: true
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
  grunt.loadNpmTasks('grunt-gitbook');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-port-pick');

  // Default task.
  grunt.registerTask('default', ['clean', 'ngmin', 'concat', 'jsbeautifier', 'jshint', 'karma:continuous']);
  grunt.registerTask('build', ['clean', 'ngmin', 'concat', 'jsbeautifier', 'jshint', 'uglify']);

  grunt.registerTask('unit', ['karma:continuous']);
  grunt.registerTask('e2e', ['copy', 'portPick', 'selenium_phantom_hub', 'connect', 'protractor', 'selenium_stop']);

  grunt.registerTask('docs', ['clean', 'ngmin', 'concat', 'ngdocs']);

  grunt.registerTask('travis', ['build', 'unit', 'coveralls']);
  grunt.registerTask('all', ['build', 'unit', 'e2e']);


};

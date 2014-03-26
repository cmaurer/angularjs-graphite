/*global module:false*/
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
          'src/namespace.js',
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
        coverage_dir: 'coverage/'
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
        scripts: ['angular.js']
      },
      targets:{
        src: ['src/**/*.js']
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

  // Default task.
  grunt.registerTask('default', ['clean', 'ngmin', 'concat', 'jsbeautifier', 'jshint', 'karma:continuous', 'uglify', 'ngmin']);
  grunt.registerTask('docs', ['clean', 'concat', 'ngdocs']);
  grunt.registerTask('travis', ['clean', 'concat', 'jsbeautifier', 'jshint', 'karma:continuous', 'coveralls']);

};

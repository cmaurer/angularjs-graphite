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
    clean: ['dist/', 'coverage/'],
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      js: {
        src: ['src/namespace.js', 'src/providers/graphite-api-provider.js'],
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
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('karma-coverage');
  grunt.loadNpmTasks('grunt-karma-coveralls');

  // Default task.
  grunt.registerTask('default', ['clean', 'concat', 'jsbeautifier', 'jshint', 'karma:continuous']);

};

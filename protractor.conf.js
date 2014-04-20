
exports.config = {
  seleniumPort: '<%= grunt.config.get("selenium_phantom_hub.options.port") %>',
  baseUrl: 'http://localhost:<%= grunt.config.get("connect.www.options.port") %>',
  seleniumAddress: 'http://localhost:<%= grunt.config.get("selenium_phantom_hub.options.port") %>/wd/hub',
  capabilities: {
    'browserName': 'phantomjs'
  },
  specs: ['test/e2e/**/*.js']

};
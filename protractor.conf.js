
exports.config = {

  baseUrl: 'http://localhost:9000',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    'browserName': 'phantomjs'
  },
  specs: ['test/e2e/**/*.js']

};
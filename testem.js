module.exports = {
  framework: 'qunit',
  test_page: 'test/index.html',
  launch_in_dev: ['Chrome'],
  launch_in_ci: ['Chrome'],
  browser_args: {
    Chrome: {
      ci: ['--remote-debugging-port=9222']
    }
  }
};
